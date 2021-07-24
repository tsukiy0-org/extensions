import { RequestHandler, Response } from "express";
import { RequestCorrelationService } from "../services/RequestCorrelationService";
import { GuidExtensions, ICorrelationService } from "@tsukiy0/extensions-core";
import { promisifyHandler } from "../helpers/promisifyHandler";

export class CorrelationMiddleware {
  private readonly key = `correlation_${GuidExtensions.generate()}`;

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const correlationService = new RequestCorrelationService(req);
    res.locals[this.key] = correlationService;
  });

  getCorrelationService = (res: Response): ICorrelationService => {
    return res.locals[this.key] as ICorrelationService;
  };
}
