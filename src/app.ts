import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ProductsController } from './controllers/products/product.controller';
import { TYPES } from './common/config.di';
import { json } from 'body-parser';
import { ILogger } from './common/logger/logger.interface';
import { IExceptionFilter } from './common/errors/exception.filter.interface';
import { PrismaService } from './common/database/prisma.service';
import cors from 'cors';
import { MaterialsController } from './controllers/products/material.controller';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;
  productsController: ProductsController;
  materialsController: MaterialsController;
  loggerService: ILogger;
  exceptionFilter: IExceptionFilter;
  prismaService: PrismaService;

  constructor(
    @inject(TYPES.ProductsController) productsController: ProductsController,
    @inject(TYPES.MaterialsController) materialsController: MaterialsController,
    @inject(TYPES.Logger) loggerService: ILogger,
    @inject(TYPES.ExceptionFilter) exceptionFilter: IExceptionFilter,
    @inject(TYPES.PrismaService) prismaService: PrismaService
  ) {
    this.app = express();
    this.port = 8000;

    this.productsController = productsController;
    this.loggerService = loggerService;
    this.exceptionFilter = exceptionFilter;
    this.prismaService = prismaService;
    this.materialsController = materialsController;
  }

  useMiddleware() {
    this.app.use(json());
    this.app.use(cors({ origin: 'http://localhost:5173' }));
  }

  useRoutes() {
    this.app.use(
      '/api',
      this.productsController.router,
      this.materialsController.router
    );
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.loggerService.log(`Сервер запущен на порту ${this.port}`);
  }
}
