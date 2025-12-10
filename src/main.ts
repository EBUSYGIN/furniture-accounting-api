import { Container, ContainerModule } from 'inversify';
import { TYPES } from './common/config.di';
import { ProductsController } from './controllers/products/product.controller';
import { App } from './app';
import { ILogger } from './common/logger/logger.interface';
import { LoggerService } from './common/logger/logger.service';
import { IConfigService } from './common/env/config.service.interface';
import { ConfigService } from './common/env/config.service';
import { IExceptionFilter } from './common/errors/exception.filter.interface';
import { ExceptionFilter } from './common/errors/exception.filter';
import { PrismaService } from './common/database/prisma.service';

import { ProductsService } from './services/products.service';
import { IProductsRepository } from './repositories/products/products.interface';
import { ProductsRepository } from './repositories/products/products.repository';
import { IMaterialsRepository } from './repositories/material/material.interface';
import { MaterialsRepository } from './repositories/material/material.repository';
import { MaterialsService } from './services/material.service';
import { MaterialsController } from './controllers/products/material.controller';

export const appBindings = new ContainerModule((bind) => {
  bind
    .bind<ProductsController>(TYPES.ProductsController)
    .to(ProductsController)
    .inSingletonScope();

  bind.bind<App>(TYPES.Application).to(App).inSingletonScope();

  bind.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();

  bind
    .bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();

  bind
    .bind<IExceptionFilter>(TYPES.ExceptionFilter)
    .to(ExceptionFilter)
    .inSingletonScope();

  bind
    .bind<PrismaService>(TYPES.PrismaService)
    .to(PrismaService)
    .inSingletonScope();

  bind
    .bind<IProductsRepository>(TYPES.ProductsRepository)
    .to(ProductsRepository)
    .inSingletonScope();

  bind
    .bind<ProductsService>(TYPES.ProductsService)
    .to(ProductsService)
    .inSingletonScope();

  bind
    .bind<IMaterialsRepository>(TYPES.MaterialsRepository)
    .to(MaterialsRepository)
    .inSingletonScope();

  bind
    .bind<MaterialsService>(TYPES.MaterialsService)
    .to(MaterialsService)
    .inSingletonScope();

  bind
    .bind<MaterialsController>(TYPES.MaterialsController)
    .to(MaterialsController)
    .inSingletonScope();
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
