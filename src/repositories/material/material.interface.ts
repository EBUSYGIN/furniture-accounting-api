import { Material, Prisma } from '@prisma/client';

export interface IMaterialsRepository {
  getAllMaterials: () => Promise<Material[]>;
  getMaterialById: (id: number) => Promise<Material | null>;
  getMaterialByName: (name: string) => Promise<Material | null>;
  createMaterial: (
    data: Prisma.MaterialCreateInput | Prisma.MaterialUncheckedCreateInput
  ) => Promise<Material>;
  updateMaterial: (
    id: number,
    data: Prisma.MaterialUpdateInput | Prisma.MaterialUncheckedUpdateInput
  ) => Promise<Material>;
  deleteMaterial: (id: number) => Promise<Material>;
}
