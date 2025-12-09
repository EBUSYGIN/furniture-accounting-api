import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';
import { IProductsRepository } from '../repositories/products.interface';
import { TYPES } from '../common/config.di';
import { ProductsRepository } from '../repositories/products.repository';

@injectable()
export class ProductsService {
  private loggerService: ILogger;
  private productsRepository: IProductsRepository;

  constructor(
    @inject(TYPES.ProductsRepository) productsRepository: ProductsRepository,
    @inject(TYPES.Logger) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
    this.productsRepository = productsRepository;
  }

  async findAll() {
    const products = await this.productsRepository.getAllProducts();
    return products;
  }
}
