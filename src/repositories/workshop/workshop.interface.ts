import { Workshop, Prisma } from '@prisma/client';

export interface IWorkshopsRepository {
  getAllWorkshops: () => Promise<Workshop[]>;
  getWorkshopById: (id: number) => Promise<Workshop | null>;
  getWorkshopByName: (name: string) => Promise<Workshop | null>;

  createWorkshop: (
    data: Prisma.WorkshopCreateInput | Prisma.WorkshopUncheckedCreateInput
  ) => Promise<Workshop>;

  updateWorkshop: (
    id: number,
    data: Prisma.WorkshopUpdateInput | Prisma.WorkshopUncheckedUpdateInput
  ) => Promise<Workshop>;

  deleteWorkshop: (id: number) => Promise<Workshop>;
}
