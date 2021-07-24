import { GuidExtensions } from "@tsukiy0/extensions-core";
import { Request, RequestHandler, Response } from "express";
import { promisifyHandler } from "../helpers/promisifyHandler";

export abstract class AbstractServicesMiddleware<T> {
  private readonly key = `services_${GuidExtensions.generate()}`;

  abstract buildServices(req: Request, res: Response): Promise<T>;

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const services = await this.buildServices(req, res);
    res.locals[this.key] = services;
  });

  getServices = (res: Response): T => {
    return res.locals[this.key] as T;
  };
}
