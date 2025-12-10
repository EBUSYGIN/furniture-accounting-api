import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';
import { TYPES } from '../common/config.di';
import { WorkshopDto } from '../dto/workshop.dto';
import { IWorkshopsRepository } from '../repositories/workshop/workshop.interface';

@injectable()
export class WorkshopsService {
  constructor(
    @inject(TYPES.WorkshopsRepository)
    private workshopsRepository: IWorkshopsRepository,
    @inject(TYPES.Logger)
    private loggerService: ILogger
  ) {}

  async findAll() {
    return this.workshopsRepository.getAllWorkshops();
  }

  async findById(id: number) {
    return this.workshopsRepository.getWorkshopById(id);
  }

  async findByName(name: string) {
    return this.workshopsRepository.getWorkshopByName(name);
  }

  async create(dto: WorkshopDto) {
    const workshop = await this.workshopsRepository.createWorkshop({
      name: dto.name,
      type: dto.type,
      workers: dto.workers,
    });

    this.loggerService.log(
      `[WorkshopsService] Создан цех ${workshop.id} (${workshop.name})`
    );

    return workshop;
  }

  async update(id: number, dto: WorkshopDto) {
    const workshop = await this.workshopsRepository.updateWorkshop(id, {
      name: dto.name,
      type: dto.type,
      workers: dto.workers,
    });

    this.loggerService.log(
      `[WorkshopsService] Обновлён цех ${workshop.id} (${workshop.name})`
    );

    return workshop;
  }

  async delete(id: number) {
    const workshop = await this.workshopsRepository.deleteWorkshop(id);

    this.loggerService.log(
      `[WorkshopsService] Удалён цех ${workshop.id} (${workshop.name})`
    );

    return workshop;
  }
}
