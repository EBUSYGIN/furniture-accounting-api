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
        path: '/products/types',
        method: 'get',
        func: this.getProductTypes,
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
      {
        path: '/products/:id/material-consumption',
        method: 'get',
        func: this.calculateMaterialConsumption,
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

  async getProductTypes(req: Request, res: Response) {
    try {
      const productTypes = await this.productsService.getAllProductTypes();
      res.json({ productTypes });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения типов продуктов' });
    }
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

  async calculateMaterialConsumption(req: Request, res: Response) {
    try {
      const productId = Number(req.params.id);
      const quantity = req.query.quantity ? Number(req.query.quantity) : 1; // по умолчанию считаем для 1 изделия

      if (Number.isNaN(productId) || productId <= 0) {
        return res.status(400).json({ error: 'Некорректный id изделия' });
      }

      if (Number.isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'quantity должен быть > 0' });
      }

      const result = await this.productsService.calculateMaterialConsumption(
        productId,
        quantity
      );

      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Ошибка расчёта сырья',
      });
    }
  }
}
