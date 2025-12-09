import { NextFunction, Response, Request } from 'express';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../config.di';
import { inject } from 'inversify';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http.error';

export class ExceptionFilter implements IExceptionFilter {
  private loggerService: ILogger;

  constructor(@inject(TYPES.Logger) loggerService: ILogger) {
    this.loggerService = loggerService;
  }

  catch(
    err: Error | HTTPError,
    request: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.loggerService.error(
        `[${err.context}] Ошибка: ${err.statusCode} ${err.context}`
      );
      res.status(err.statusCode).send({ error: err.message });
    } else {
      this.loggerService.error(`${err.message}`);
      res.status(500).send({ error: err.message });
    }
  }
}
