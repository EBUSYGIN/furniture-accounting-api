import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';

import { TYPES } from '../common/config.di';
import { ProductDto } from '../dto/product.dto';
import { ProductEntity } from '../entitites/product.entity';
import { IProductsRepository } from '../repositories/products/products.interface';
import { Prisma } from '@prisma/client';

function generateArticle(): string {
  const min = 1000000;
  const max = 9999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

@injectable()
export class ProductsService {
  private loggerService: ILogger;
  private productsRepository: IProductsRepository;

  constructor(
    @inject(TYPES.ProductsRepository) productsRepository: IProductsRepository,
    @inject(TYPES.Logger) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
    this.productsRepository = productsRepository;
  }

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
      const entity = new ProductEntity(
        dto.name,
        dto.typeId,
        dto.materialId,
        dto.minPrice
      );

      let product;

      // Пытаемся сгенерировать уникальный артикул
      for (;;) {
        const article = generateArticle();
        try {
          product = await this.productsRepository.createProduct(
            entity.toCreateData(article)
          );
          break;
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
          ) {
            // дубликат article — пробуем сгенерировать новый
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
    const entity = new ProductEntity(
      dto.name,
      dto.typeId,
      dto.materialId,
      dto.minPrice
    );

    const product = await this.productsRepository.updateProduct(
      id,
      entity.toUpdateData()
    );

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
