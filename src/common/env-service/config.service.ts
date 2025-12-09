import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../config.di';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.Logger) private loggerService: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error(
        'Не удалось прочитать файл env или он отсутствует'
      );
    } else {
      this.loggerService.log('[ConfigService] Конфигурация .env загружена');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
