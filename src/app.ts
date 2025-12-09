import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ProductsController } from './controllers/products/product.controller';
import { TYPES } from './common/config.di';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;
  productsController: ProductsController;

  constructor(
    @inject(TYPES.ProductsController) productsController: ProductsController
  ) {
    this.app = express();
    this.port = 8000;

    this.productsController = productsController;
  }

  useRoutes() {
    this.app.use('/api', this.productsController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
  }
}
