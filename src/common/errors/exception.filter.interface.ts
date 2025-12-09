import { NextFunction, Request, Response } from 'express';
import { HTTPError } from './http.error';

export interface IExceptionFilter {
  catch: (
    err: HTTPError | Error,
    request: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
