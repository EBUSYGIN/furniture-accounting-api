export const TYPES = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('LoggerService'),
  ConfigService: Symbol.for('ConfigService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  PrismaService: Symbol.for('PrismaService'),

  // Products
  ProductsController: Symbol.for('ProductsController'),
  ProductsRepository: Symbol.for('ProductRepository'),
  ProductsService: Symbol.for('ProductsService'),

  // Materials
  MaterialsController: Symbol.for('MaterialsController'),
  MaterialsRepository: Symbol.for('MaterialsRepository'),
  MaterialsService: Symbol.for('MaterialsService'),

  // Workshops
  WorkshopsController: Symbol.for('WorkshopsController'),
  WorkshopsRepository: Symbol.for('WorkshopsRepository'),
  WorkshopsService: Symbol.for('WorkshopsService'),

  // Product–Workshop relations
  ProductWorkshopsController: Symbol.for('ProductWorkshopsController'),
  ProductWorkshopsRepository: Symbol.for('ProductWorkshopsRepository'),
  ProductWorkshopsService: Symbol.for('ProductWorkshopsService'),
};
