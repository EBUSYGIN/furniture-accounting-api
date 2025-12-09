import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ProductsController } from './controllers/products/product.controller';
import { TYPES } from './common/config.di';
import { json } from 'body-parser';
import { ILogger } from './common/logger/logger.interface';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;
  productsController: ProductsController;
  loggerService: ILogger;

  constructor(
    @inject(TYPES.ProductsController) productsController: ProductsController,
    @inject(TYPES.Logger) loggerService: ILogger
  ) {
    this.app = express();
    this.port = 8000;

    this.productsController = productsController;
    this.loggerService = loggerService;
  }

  useMiddleware() {
    this.app.use(json());
  }

  useRoutes() {
    this.app.use('/api', this.productsController.router);
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.loggerService.log(`Сервер запущен на порту ${this.port}`);
  }
}
