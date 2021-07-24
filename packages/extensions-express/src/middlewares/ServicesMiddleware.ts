import { Request, RequestHandler, Response } from "express";
import { GuidExtensions } from "packages/extensions-core/src/extensions/GuidExtensions";
import { promisifyHandler } from "packages/extensions-express/dist";

export abstract class ServicesMiddleware<T> {
  protected readonly key = `services_${GuidExtensions.generate()}`;

  abstract buildServices(req: Request, res: Response): Promise<T>;

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const services = await this.buildServices(req, res);
    res.locals[this.key] = services;
  });

  getServices = (res: Response): T => {
    return res.locals[this.key] as T;
  };
}
