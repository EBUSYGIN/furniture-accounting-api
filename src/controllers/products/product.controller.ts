import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/controller/base.controller';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../../common/errors/http.error';
import { ProductsService } from '../../services/products.service';
import { TYPES } from '../../common/config.di';

@injectable()
export class ProductsController extends BaseController {
  constructor(
    @inject(TYPES.ProductsService) private productsService: ProductsService
  ) {
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

  async getAllProducts(
    { body }: Request,
    response: Response,
    next: NextFunction
  ) {
    const products = await this.productsService.findAll();

    if (!products) {
      next(new HTTPError(400, 'Ошибка фильтра'));
    } else {
      this.ok(response, { products });
    }
  }
}
