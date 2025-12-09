import { NextFunction, Request, Response, Router } from 'express';

export interface IMiddleware {
  execute: (request: Request, response: Response, next: NextFunction) => void;
}
