import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';
import { TYPES } from '../common/config.di';
import { ProductDto } from '../dto/product.dto';
import { IProductsRepository } from '../repositories/products/products.interface';
import { Prisma } from '../../generated/prisma/client';

function generateArticle(): string {
  const min = 1000000;
  const max = 9999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

@injectable()
export class ProductsService {
  constructor(
    @inject(TYPES.ProductsRepository)
    private productsRepository: IProductsRepository,
    @inject(TYPES.Logger)
    private loggerService: ILogger
  ) {}

  async findAll() {
    return this.productsRepository.getAllProducts();
  }

  async findById(id: number) {
    return this.productsRepository.getProductById(id);
  }

  async findByArticle(article: string) {
    return this.productsRepository.getProductByArticle(article);
  }

  async create(dto: ProductDto) {
    try {
      // генерим article, пока не пройдём уникальное ограничение
      let product;
      for (;;) {
        const article = generateArticle();
        try {
          product = await this.productsRepository.createProduct({
            name: dto.name,
            article,
            typeId: dto.typeId,
            materialId: dto.materialId,
            minPrice: dto.minPrice,
          });
          break;
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
          ) {
            // дубликат article, пробуем ещё раз
            continue;
          }
          throw error;
        }
      }

      this.loggerService.log(
        `[ProductsService] Создано изделие ${product.id} (${product.article})`
      );

      return product;
    } catch (error) {
      this.loggerService.error(
        `[ProductsService] Ошибка при создании изделия: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw error;
    }
  }

  async update(id: number, dto: ProductDto) {
    const product = await this.productsRepository.updateProduct(id, {
      name: dto.name,
      typeId: dto.typeId,
      materialId: dto.materialId,
      minPrice: dto.minPrice,
      // article генерится только при создании, при обновлении не трогаем
    });

    this.loggerService.log(
      `[ProductsService] Обновлено изделие ${product.id} (${product.article})`
    );

    return product;
  }

  async delete(id: number) {
    const product = await this.productsRepository.deleteProduct(id);

    this.loggerService.log(
      `[ProductsService] Удалено изделие ${product.id} (${product.article})`
    );

    return product;
  }

  async findByType(typeId: number) {
    return this.productsRepository.getProductsByType(typeId);
  }

  async findByMaterial(materialId: number) {
    return this.productsRepository.getProductsByMaterial(materialId);
  }
}
