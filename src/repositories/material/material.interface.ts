// src/repositories/materials/materials.interface.ts

import { Material } from '@prisma/client';

export interface IMaterialsRepository {
  getAllMaterials: () => Promise<Material[]>;
  getMaterialById: (id: number) => Promise<Material | null>;
  getMaterialByName: (name: string) => Promise<Material | null>;
  createMaterial: (data: any) => Promise<Material>;
  updateMaterial: (id: number, data: any) => Promise<Material>;
  deleteMaterial: (id: number) => Promise<Material>;
}
