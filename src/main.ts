import { Container, ContainerModule } from 'inversify';
import { TYPES } from './common/config.di';
import { ProductsController } from './controllers/products/product.controller';
import { App } from './app';

export const appBindings = new ContainerModule((bind) => {
  bind
    .bind<ProductsController>(TYPES.ProductsController)
    .to(ProductsController)
    .inSingletonScope();

  bind.bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
