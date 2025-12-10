import { ProductWorkshop, Prisma } from '@prisma/client';

export interface IProductWorkshopsRepository {
  getAllByProduct: (productId: number) => Promise<ProductWorkshop[]>;
  getAllByWorkshop: (workshopId: number) => Promise<ProductWorkshop[]>;
  getOne: (
    productId: number,
    workshopId: number
  ) => Promise<ProductWorkshop | null>;

  createProductWorkshop: (
    data:
      | Prisma.ProductWorkshopCreateInput
      | Prisma.ProductWorkshopUncheckedCreateInput
  ) => Promise<ProductWorkshop>;

  updateProductWorkshop: (
    id: number,
    data:
      | Prisma.ProductWorkshopUpdateInput
      | Prisma.ProductWorkshopUncheckedUpdateInput
  ) => Promise<ProductWorkshop>;

  deleteProductWorkshop: (id: number) => Promise<ProductWorkshop>;
}
