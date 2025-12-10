import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';
import { TYPES } from '../common/config.di';
import { MaterialDto } from '../dto/material.dto';
import { Prisma } from '../../generated/prisma/client';
import { IMaterialsRepository } from '../repositories/material/material.interface';

@injectable()
export class MaterialsService {
  constructor(
    @inject(TYPES.MaterialsRepository)
    private materialsRepository: IMaterialsRepository,
    @inject(TYPES.Logger)
    private loggerService: ILogger
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
    try {
      const material = await this.materialsRepository.createMaterial({
        name: dto.name,
        lossPercent: dto.lossPercent,
      });

      this.loggerService.log(
        `[MaterialsService] Создан материал ${material.id} (${material.name})`
      );

      return material;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        this.loggerService.error(
          `[MaterialsService] Материал с таким именем уже существует`
        );
      } else {
        this.loggerService.error(
          `[MaterialsService] Ошибка при создании материала: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
      throw error;
    }
  }

  async update(id: number, dto: MaterialDto) {
    const material = await this.materialsRepository.updateMaterial(id, {
      name: dto.name,
      lossPercent: dto.lossPercent,
    });

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
