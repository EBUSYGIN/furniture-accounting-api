import { ProductsRepository } from '../repositories/products.repository';

export const TYPES = {
  Application: Symbol.for('Application'),
  ProductsController: Symbol.for('ProductsController'),
  Logger: Symbol.for('LoggerService'),
  ConfigService: Symbol.for('ConfigService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  PrismaService: Symbol.for('PrismaService'),
  ProductsRepository: Symbol.for('ProductRepository'),
  ProductsService: Symbol.for('ProductsService'),
};
