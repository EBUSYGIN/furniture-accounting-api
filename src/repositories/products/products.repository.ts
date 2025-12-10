import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/config.di';
import { PrismaService } from '../../common/database/prisma.service';
import { IProductsRepository } from './products.interface';

@injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}

  async getAllProducts() {
    return this.prismaService.client.product.findMany();
  }

  async getProductById(id: number) {
    return this.prismaService.client.product.findFirst({
      where: { id },
    });
  }

  async getProductByArticle(article: string) {
    return this.prismaService.client.product.findFirst({
      where: { article },
    });
  }

  async createProduct(data: any) {
    return this.prismaService.client.product.create({
      data,
    });
  }

  async updateProduct(id: number, data: any) {
    return this.prismaService.client.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number) {
    return this.prismaService.client.product.delete({
      where: { id },
    });
  }

  async getProductsByType(typeId: number) {
    return this.prismaService.client.product.findMany({
      where: { typeId },
    });
  }

  async getProductsByMaterial(materialId: number) {
    return this.prismaService.client.product.findMany({
      where: { materialId },
    });
  }
}
