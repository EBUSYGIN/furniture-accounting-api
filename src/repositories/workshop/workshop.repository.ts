import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/config.di';
import { PrismaService } from '../../common/database/prisma.service';
import { Workshop, Prisma } from '@prisma/client';
import { IWorkshopsRepository } from './workshop.interface';

@injectable()
export class WorkshopsRepository implements IWorkshopsRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}

  async getAllWorkshops(): Promise<Workshop[]> {
    return this.prismaService.client.workshop.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getWorkshopById(id: number): Promise<Workshop | null> {
    return this.prismaService.client.workshop.findFirst({
      where: { id },
    });
  }

  async getWorkshopByName(name: string): Promise<Workshop | null> {
    return this.prismaService.client.workshop.findFirst({
      where: { name },
    });
  }

  async createWorkshop(
    data: Prisma.WorkshopCreateInput | Prisma.WorkshopUncheckedCreateInput
  ): Promise<Workshop> {
    return this.prismaService.client.workshop.create({ data });
  }

  async updateWorkshop(
    id: number,
    data: Prisma.WorkshopUpdateInput | Prisma.WorkshopUncheckedUpdateInput
  ): Promise<Workshop> {
    return this.prismaService.client.workshop.update({
      where: { id },
      data,
    });
  }

  async deleteWorkshop(id: number): Promise<Workshop> {
    return this.prismaService.client.workshop.delete({
      where: { id },
    });
  }
}
