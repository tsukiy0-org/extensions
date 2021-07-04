import { RequestHandler, Response } from "express";
import { RequestCorrelationService } from "../services/RequestCorrelationService";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";
import { ILogger } from "@tsukiy0/extensions-core";

export class LoggerMiddleware {
  private static readonly key = "logger";

  static handler =
    (name: string): RequestHandler =>
    (req, res, next) => {
      const correlationService = new RequestCorrelationService(req);

      const logger = new WinstonLogger(name, correlationService, []);

      res.locals[LoggerMiddleware.key] = logger;

      res.on("finish", () => {
        logger.info("TRANSACTION", {
          request: {
            method: req.method,
            path: req.path,
            url: req.url,
            query: req.query,
            headers: req.headers,
            body: req.body,
          },
          response: {
            status: res.statusCode,
          },
        });
      });

      next();
    };

  static getLogger = (res: Response): ILogger => {
    return res.locals[LoggerMiddleware.key] as ILogger;
  };
}
