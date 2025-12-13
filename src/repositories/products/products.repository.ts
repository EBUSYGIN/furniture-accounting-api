import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/config.di';
import { PrismaService } from '../../common/database/prisma.service';
import { Prisma, Product } from '@prisma/client';

@injectable()
export class ProductsRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prismaService.client.product.findMany({
      include: {
        material: true,
        type: true,
        workshops: {
          include: {
            workshop: true,
          },
        },
      },
    });
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.prismaService.client.product.findFirst({
      where: { id },
    });
  }

  async getProductByArticle(article: string): Promise<Product | null> {
    return this.prismaService.client.product.findFirst({
      where: { article },
    });
  }

  async createProduct(
    data: Prisma.ProductCreateInput | Prisma.ProductUncheckedCreateInput
  ): Promise<Product> {
    return this.prismaService.client.product.create({ data });
  }

  async updateProduct(
    id: number,
    data: Prisma.ProductUpdateInput | Prisma.ProductUncheckedUpdateInput
  ): Promise<Product> {
    return this.prismaService.client.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prismaService.client.product.delete({
      where: { id },
    });
  }

  async getProductsByType(typeId: number): Promise<Product[]> {
    return this.prismaService.client.product.findMany({
      where: { typeId },
    });
  }

  async getProductsByMaterial(materialId: number): Promise<Product[]> {
    return this.prismaService.client.product.findMany({
      where: { materialId },
    });
  }

  async getAllProductTypes() {
    return this.prismaService.client.productType.findMany();
  }

  async getProductWithMaterialById(id: number) {
    return this.prismaService.client.product.findFirst({
      where: { id },
      include: {
        material: true,
      },
    });
  }
}
