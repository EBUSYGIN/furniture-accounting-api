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
      {
        path: '/products/:id',
        method: 'get',
        func: this.getProductById,
      },
      {
        path: '/products',
        method: 'post',
        func: this.createProduct,
      },
      {
        path: '/products/:id',
        method: 'put',
        func: this.updateProduct,
      },
      {
        path: '/products/:id',
        method: 'delete',
        func: this.deleteProduct,
      },
    ]);
  }

  async getAllProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const products = await this.productsService.findAll();

    if (!products) {
      return next(new HTTPError(400, 'Ошибка получения изделий'));
    }

    this.ok(response, { products });
  }

  async getProductById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    const product = await this.productsService.findById(id);

    if (!product) {
      return next(new HTTPError(404, 'Изделие не найдено'));
    }

    this.ok(response, { product });
  }

  async createProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const product = await this.productsService.create(request.body);
      this.ok(response, { product });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка создания изделия'));
    }
  }

  async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      const product = await this.productsService.update(id, request.body);
      this.ok(response, { product });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка обновления изделия'));
    }
  }

  async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      await this.productsService.delete(id);
      this.ok(response, { deleted: true });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка удаления изделия'));
    }
  }
}
