import { Product } from '../../generated/prisma/client';

export interface IProductsRepository {
  getAllProducts: () => Promise<Product[] | undefined>;
}
