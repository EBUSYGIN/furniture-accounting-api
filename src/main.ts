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
import { IProductsRepository } from './repositories/products.interface';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsService } from './services/products.service';

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
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
