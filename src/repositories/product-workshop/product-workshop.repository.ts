import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/config.di';
import { PrismaService } from '../../common/database/prisma.service';
import { ProductWorkshop, Prisma } from '@prisma/client';
import { IProductWorkshopsRepository } from './product-workshop.interface';

@injectable()
export class ProductWorkshopsRepository implements IProductWorkshopsRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}

  async getAllByProduct(productId: number): Promise<ProductWorkshop[]> {
    return this.prismaService.client.productWorkshop.findMany({
      where: { productId },
    });
  }

  async getAllByWorkshop(workshopId: number): Promise<ProductWorkshop[]> {
    return this.prismaService.client.productWorkshop.findMany({
      where: { workshopId },
    });
  }

  async getOne(
    productId: number,
    workshopId: number
  ): Promise<ProductWorkshop | null> {
    return this.prismaService.client.productWorkshop.findFirst({
      where: { productId, workshopId },
    });
  }

  async createProductWorkshop(
    data:
      | Prisma.ProductWorkshopCreateInput
      | Prisma.ProductWorkshopUncheckedCreateInput
  ): Promise<ProductWorkshop> {
    return this.prismaService.client.productWorkshop.create({ data });
  }

  async updateProductWorkshop(
    id: number,
    data:
      | Prisma.ProductWorkshopUpdateInput
      | Prisma.ProductWorkshopUncheckedUpdateInput
  ): Promise<ProductWorkshop> {
    return this.prismaService.client.productWorkshop.update({
      where: { id },
      data,
    });
  }

  async deleteProductWorkshop(id: number): Promise<ProductWorkshop> {
    return this.prismaService.client.productWorkshop.delete({
      where: { id },
    });
  }
}
