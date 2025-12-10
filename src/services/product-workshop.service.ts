// src/services/product-workshops.service.ts
import { inject, injectable } from 'inversify';
import { ILogger } from '../common/logger/logger.interface';
import { TYPES } from '../common/config.di';
import { ProductWorkshopDto } from '../dto/product-workshop.dto';
import { IProductWorkshopsRepository } from '../repositories/product-workshop/product-workshop.interface';

@injectable()
export class ProductWorkshopsService {
  constructor(
    @inject(TYPES.ProductWorkshopsRepository)
    private productWorkshopsRepository: IProductWorkshopsRepository,
    @inject(TYPES.Logger)
    private loggerService: ILogger
  ) {}

  async findByProduct(productId: number) {
    return this.productWorkshopsRepository.getAllByProduct(productId);
  }

  async findByWorkshop(workshopId: number) {
    return this.productWorkshopsRepository.getAllByWorkshop(workshopId);
  }

  async create(dto: ProductWorkshopDto) {
    const pw = await this.productWorkshopsRepository.createProductWorkshop({
      product: { connect: { id: dto.productId } },
      workshop: { connect: { id: dto.workshopId } },
      productionTime: dto.productionTime,
    });

    this.loggerService.log(
      `[ProductWorkshopsService] Связь продукт-цех создана ${pw.id} (product=${pw.productId}, workshop=${pw.workshopId})`
    );

    return pw;
  }

  async update(id: number, dto: ProductWorkshopDto) {
    const pw = await this.productWorkshopsRepository.updateProductWorkshop(id, {
      productionTime: dto.productionTime,
      // productId/workshopId обычно не меняют, если нужно — добавь сюда
    });

    this.loggerService.log(
      `[ProductWorkshopsService] Связь продукт-цех обновлена ${pw.id}`
    );

    return pw;
  }

  async delete(id: number) {
    const pw = await this.productWorkshopsRepository.deleteProductWorkshop(id);

    this.loggerService.log(
      `[ProductWorkshopsService] Связь продукт-цех удалена ${pw.id}`
    );

    return pw;
  }

  async getTotalProductionTimeByProduct(productId: number) {
    const items = await this.productWorkshopsRepository.getAllByProduct(
      productId
    );
    return items.reduce((sum, item) => sum + item.productionTime, 0);
  }
}
