import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/controller/base.controller';
import { injectable } from 'inversify';

@injectable()
export class ProductsController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: '/products',
        method: 'get',
        func: this.getAllProducts,
      },
      // {
      //   path: '/products/:id',
      //   method: 'get',
      //   func: getProductById,
      // },
      // {
      //   path: '/products',
      //   method: 'post',
      //   func: createProduct,
      // },
      // {
      //   path: '/products/:id',
      //   method: 'put',
      //   func: updateProduct,
      // },
      // {
      //   path: '/products/:id',
      //   method: 'delete',
      //   func: deleteProduct,
      // },
    ]);
  }

  getAllProducts(request: Request, response: Response, next: NextFunction) {
    //работа сервиса + репозитория
    return this.ok(response, 200);
  }
}
