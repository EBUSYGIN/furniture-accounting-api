import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/controller/base.controller';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../../common/errors/http.error';
import { TYPES } from '../../common/config.di';
import { ProductWorkshopsService } from '../../services/product-workshop.service';

@injectable()
export class ProductWorkshopsController extends BaseController {
  constructor(
    @inject(TYPES.ProductWorkshopsService)
    private productWorkshopsService: ProductWorkshopsService
  ) {
    super();
    this.bindRoutes([
      {
        path: '/product-workshops',
        method: 'post',
        func: this.createProductWorkshop,
      },
      {
        path: '/product-workshops/:id',
        method: 'put',
        func: this.updateProductWorkshop,
      },
      {
        path: '/product-workshops/:id',
        method: 'delete',
        func: this.deleteProductWorkshop,
      },
      {
        path: '/products/:productId/workshops',
        method: 'get',
        func: this.getWorkshopsByProduct,
      },
      {
        path: '/workshops/:workshopId/products',
        method: 'get',
        func: this.getProductsByWorkshop,
      },
      {
        path: '/products/:productId/production-time',
        method: 'get',
        func: this.getTotalTimeByProduct,
      },
    ]);
  }

  async createProductWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const pw = await this.productWorkshopsService.create(request.body);
      this.ok(response, { productWorkshop: pw });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка создания связи продукт-цех'));
    }
  }

  async updateProductWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      const pw = await this.productWorkshopsService.update(id, request.body);
      this.ok(response, { productWorkshop: pw });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка обновления связи продукт-цех'));
    }
  }

  async deleteProductWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      await this.productWorkshopsService.delete(id);
      this.ok(response, { deleted: true });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка удаления связи продукт-цех'));
    }
  }

  async getWorkshopsByProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const productId = Number(request.params.productId);

    if (Number.isNaN(productId)) {
      return next(new HTTPError(400, 'Некорректный id продукта'));
    }

    const items = await this.productWorkshopsService.findByProduct(productId);

    this.ok(response, { productWorkshops: items });
  }

  async getProductsByWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const workshopId = Number(request.params.workshopId);

    if (Number.isNaN(workshopId)) {
      return next(new HTTPError(400, 'Некорректный id цеха'));
    }

    const items = await this.productWorkshopsService.findByWorkshop(workshopId);

    this.ok(response, { productWorkshops: items });
  }

  async getTotalTimeByProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const productId = Number(request.params.productId);

    if (Number.isNaN(productId)) {
      return next(new HTTPError(400, 'Некорректный id продукта'));
    }

    const total =
      await this.productWorkshopsService.getTotalProductionTimeByProduct(
        productId
      );

    this.ok(response, { productId, totalProductionTime: total });
  }
}
