import { Container, ContainerModule } from 'inversify';
import { TYPES } from './common/config.di';
import { ProductsController } from './controllers/products/product.controller';
import { App } from './app';
import { ILogger } from './common/logger/logger.interface';
import { LoggerService } from './common/logger/logger.service';
import { IConfigService } from './common/env-service/config.service.interface';
import { ConfigService } from './common/env-service/config.service';

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
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
