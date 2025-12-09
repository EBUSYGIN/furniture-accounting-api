import 'dotenv/config';
import { inject, injectable } from 'inversify';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../../generated/prisma/client';
import { TYPES } from '../config.di';
import { ILogger } from '../logger/logger.interface';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
export const prisma = new PrismaClient({ adapter });

@injectable()
export class PrismaService {
  client: PrismaClient;
  private loggerService: ILogger;

  constructor(@inject(TYPES.Logger) loggerService: ILogger) {
    this.loggerService = loggerService;
    this.client = new PrismaClient({ adapter });
  }

  async connect() {
    try {
      await this.client.$connect();
      this.loggerService.log('[PrismaService] Успешное подключение к бд');
    } catch (e) {
      if (e instanceof Error) {
        this.loggerService.error(
          '[PrismaService] ошибка подключения к бд: ' + e.message
        );
      }
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
