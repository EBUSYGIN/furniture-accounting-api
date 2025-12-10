import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/config.di';
import { PrismaService } from '../../common/database/prisma.service';
import { IMaterialsRepository } from './material.interface';
import { Material, Prisma } from '@prisma/client';

@injectable()
export class MaterialsRepository implements IMaterialsRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}

  async getAllMaterials() {
    return this.prismaService.client.material.findMany();
  }

  async getMaterialById(id: number) {
    return this.prismaService.client.material.findFirst({
      where: { id },
    });
  }

  async getMaterialByName(name: string) {
    return this.prismaService.client.material.findFirst({
      where: { name },
    });
  }

  async createMaterial(
    data: Prisma.MaterialCreateInput | Prisma.MaterialUncheckedCreateInput
  ): Promise<Material> {
    return this.prismaService.client.material.create({ data });
  }

  async updateMaterial(
    id: number,
    data: Prisma.MaterialUpdateInput | Prisma.MaterialUncheckedUpdateInput
  ): Promise<Material> {
    return this.prismaService.client.material.update({ where: { id }, data });
  }

  async deleteMaterial(id: number) {
    return this.prismaService.client.material.delete({
      where: { id },
    });
  }
}
