import { Product, Prisma } from '@prisma/client';

export interface IProductsRepository {
  getAllProducts: () => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product | null>;
  getProductByArticle: (article: string) => Promise<Product | null>;
  createProduct: (
    data: Prisma.ProductCreateInput | Prisma.ProductUncheckedCreateInput
  ) => Promise<Product>;
  updateProduct: (
    id: number,
    data: Prisma.ProductUpdateInput | Prisma.ProductUncheckedUpdateInput
  ) => Promise<Product>;
  deleteProduct: (id: number) => Promise<Product>;
  getProductsByType: (typeId: number) => Promise<Product[]>;
  getProductsByMaterial: (materialId: number) => Promise<Product[]>;
}
