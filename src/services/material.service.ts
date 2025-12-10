// src/services/materials.service.ts
import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';
import { TYPES } from '../common/config.di';
import { MaterialDto } from '../dto/material.dto';
import { MaterialEntity } from '../entitites/material.entity';
import { IMaterialsRepository } from '../repositories/material/material.interface';

@injectable()
export class MaterialsService {
  constructor(
    @inject(TYPES.MaterialsRepository)
    private materialsRepository: IMaterialsRepository,
    @inject(TYPES.Logger) private loggerService: ILogger
  ) {}

  async findAll() {
    return this.materialsRepository.getAllMaterials();
  }

  async findById(id: number) {
    return this.materialsRepository.getMaterialById(id);
  }

  async findByName(name: string) {
    return this.materialsRepository.getMaterialByName(name);
  }

  async create(dto: MaterialDto) {
    const entity = new MaterialEntity(dto.name, dto.lossPercent);

    const material = await this.materialsRepository.createMaterial(
      entity.toCreateData()
    );

    this.loggerService.log(
      `[MaterialsService] Создан материал ${material.id} (${material.name})`
    );

    return material;
  }

  async update(id: number, dto: MaterialDto) {
    const entity = new MaterialEntity(dto.name, dto.lossPercent);

    const material = await this.materialsRepository.updateMaterial(
      id,
      entity.toUpdateData()
    );

    this.loggerService.log(
      `[MaterialsService] Обновлён материал ${material.id} (${material.name})`
    );

    return material;
  }

  async delete(id: number) {
    const material = await this.materialsRepository.deleteMaterial(id);

    this.loggerService.log(
      `[MaterialsService] Удалён материал ${material.id} (${material.name})`
    );

    return material;
  }
}
