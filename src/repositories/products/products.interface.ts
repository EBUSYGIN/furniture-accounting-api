import { Product } from '@prisma/client';

export interface IProductsRepository {
  getAllProducts: () => Promise<Product[]>;

  getProductById: (id: number) => Promise<Product | null>;

  getProductByArticle: (article: string) => Promise<Product | null>;

  createProduct: (data: any) => Promise<Product>;

  updateProduct: (id: number, data: any) => Promise<Product>;

  deleteProduct: (id: number) => Promise<Product>;

  getProductsByType: (typeId: number) => Promise<Product[]>;

  getProductsByMaterial: (materialId: number) => Promise<Product[]>;
}
