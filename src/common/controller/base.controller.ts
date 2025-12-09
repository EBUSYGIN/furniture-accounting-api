import { Response, Router } from 'express';
import { IRoute } from './route.interface';

export abstract class BaseController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public created(res: Response) {
    res.sendStatus(201);
  }

  send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  protected bindRoutes(routes: IRoute[]) {
    for (const route of routes) {
      const middleware = route.middlewares?.map((middleware) =>
        middleware.execute.bind(middleware)
      );

      const routeHandler = route.func.bind(this);

      const pipeline = middleware
        ? [...middleware, routeHandler]
        : routeHandler;

      this.router[route.method](route.path, pipeline);
    }
  }
}
