import { MaterialsController } from '../controllers/products/material.controller';

export const TYPES = {
  Application: Symbol.for('Application'),
  ProductsController: Symbol.for('ProductsController'),
  Logger: Symbol.for('LoggerService'),
  ConfigService: Symbol.for('ConfigService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  PrismaService: Symbol.for('PrismaService'),
  ProductsRepository: Symbol.for('ProductRepository'),
  ProductsService: Symbol.for('ProductsService'),
  MaterialsService: Symbol.for('MaterialsService'),
  MaterialsRepository: Symbol.for('MaterialsRepository'),
  MaterialsController: Symbol.for('MaterialsController'),
};
