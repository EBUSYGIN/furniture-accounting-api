import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/controller/base.controller';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../../common/errors/http.error';
import { TYPES } from '../../common/config.di';
import { WorkshopsService } from '../../services/workshop.service';

@injectable()
export class WorkshopsController extends BaseController {
  constructor(
    @inject(TYPES.WorkshopsService)
    private workshopsService: WorkshopsService
  ) {
    super();
    this.bindRoutes([
      {
        path: '/workshops',
        method: 'get',
        func: this.getAllWorkshops,
      },
      {
        path: '/workshops/:id',
        method: 'get',
        func: this.getWorkshopById,
      },
      {
        path: '/workshops',
        method: 'post',
        func: this.createWorkshop,
      },
      {
        path: '/workshops/:id',
        method: 'put',
        func: this.updateWorkshop,
      },
      {
        path: '/workshops/:id',
        method: 'delete',
        func: this.deleteWorkshop,
      },
    ]);
  }

  async getAllWorkshops(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const workshops = await this.workshopsService.findAll();

    if (!workshops) {
      return next(new HTTPError(400, 'Ошибка получения цехов'));
    }

    this.ok(response, { workshops });
  }

  async getWorkshopById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    const workshop = await this.workshopsService.findById(id);

    if (!workshop) {
      return next(new HTTPError(404, 'Цех не найден'));
    }

    this.ok(response, { workshop });
  }

  async createWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const workshop = await this.workshopsService.create(request.body);
      this.ok(response, { workshop });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка создания цеха'));
    }
  }

  async updateWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      const workshop = await this.workshopsService.update(id, request.body);
      this.ok(response, { workshop });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка обновления цеха'));
    }
  }

  async deleteWorkshop(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      await this.workshopsService.delete(id);
      this.ok(response, { deleted: true });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка удаления цеха'));
    }
  }
}
