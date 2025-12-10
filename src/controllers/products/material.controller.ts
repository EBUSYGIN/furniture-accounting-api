// src/controllers/materials/materials.controller.ts
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/controller/base.controller';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../../common/errors/http.error';
import { TYPES } from '../../common/config.di';
import { MaterialsService } from '../../services/material.service';

@injectable()
export class MaterialsController extends BaseController {
  constructor(
    @inject(TYPES.MaterialsService)
    private materialsService: MaterialsService
  ) {
    super();
    this.bindRoutes([
      {
        path: '/materials',
        method: 'get',
        func: this.getAllMaterials,
      },
      {
        path: '/materials/:id',
        method: 'get',
        func: this.getMaterialById,
      },
      {
        path: '/materials',
        method: 'post',
        func: this.createMaterial,
      },
      {
        path: '/materials/:id',
        method: 'put',
        func: this.updateMaterial,
      },
      {
        path: '/materials/:id',
        method: 'delete',
        func: this.deleteMaterial,
      },
    ]);
  }

  async getAllMaterials(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const materials = await this.materialsService.findAll();

    if (!materials) {
      return next(new HTTPError(400, 'Ошибка получения материалов'));
    }

    this.ok(response, { materials });
  }

  async getMaterialById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);
    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    const material = await this.materialsService.findById(id);

    if (!material) {
      return next(new HTTPError(404, 'Материал не найден'));
    }

    this.ok(response, { material });
  }

  async createMaterial(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const material = await this.materialsService.create(request.body);
      this.ok(response, { material });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка создания материала'));
    }
  }

  async updateMaterial(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);
    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      const material = await this.materialsService.update(id, request.body);
      this.ok(response, { material });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка обновления материала'));
    }
  }

  async deleteMaterial(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = Number(request.params.id);
    if (Number.isNaN(id)) {
      return next(new HTTPError(400, 'Некорректный id'));
    }

    try {
      await this.materialsService.delete(id);
      this.ok(response, { deleted: true });
    } catch (e) {
      next(new HTTPError(400, 'Ошибка удаления материала'));
    }
  }
}
