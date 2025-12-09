import { inject, injectable } from 'inversify';
import { IConfigService } from '../common/env-service/config.service.interface';
import { TYPES } from '../common/config.di';

@injectable()
export class ProductsService {
  private configService: IConfigService;

  constructor(@inject(TYPES.ConfigService) configService: IConfigService) {
    this.configService = configService;
  }

  async getAllProducts();
}
