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
      let product;

      for (;;) {
        const article = generateArticle();

        try {
          product = await this.productsRepository.createProduct({
            name: dto.name,
            article,
            typeId: Number(dto.typeId),
            materialId: Number(dto.materialId),
            minPrice: Number(dto.minPrice),
          });
          break;
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
          ) {
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
    try {
      // Готовим data для Prisma, конвертируя строки в числа и убирая undefined
      const data: Prisma.ProductUpdateInput = {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.typeId !== undefined && { typeId: Number(dto.typeId) }),
        ...(dto.materialId !== undefined && {
          materialId: Number(dto.materialId),
        }),
        ...(dto.minPrice !== undefined && { minPrice: Number(dto.minPrice) }),
      };

      const product = await this.productsRepository.updateProduct(id, data);

      this.loggerService.log(
        `[ProductsService] Обновлено изделие ${product.id} (${product.article})`
      );

      return product;
    } catch (error) {
      this.loggerService.error(
        `[ProductsService] Ошибка при обновлении изделия: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw error;
    }
  }
  async getAllProductTypes() {
    return this.productsRepository.getAllProductTypes();
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

  async calculateMaterialConsumption(productId: number, quantity: number) {
    const product = await this.productsRepository.getProductWithMaterialById(
      productId
    );

    if (!product) {
      throw new Error(`Изделие с id=${productId} не найдено`);
    }

    // здесь product уже имеет поле material благодаря include
    const lossPercent = product.material.lossPercent ?? 0;

    const basePerUnit = product.minPrice;
    const baseTotal = basePerUnit * quantity;
    const k = 1 - lossPercent / 100;
    const requiredTotal = k > 0 ? baseTotal / k : baseTotal;

    return {
      productId: product.id,
      productName: product.name,
      materialId: product.materialId,
      materialName: product.material.name,
      lossPercent,
      quantity,
      basePerUnit,
      baseTotal,
      requiredTotal,
    };
  }
}
