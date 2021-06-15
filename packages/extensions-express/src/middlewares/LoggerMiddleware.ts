import { RequestHandler } from "express";
import { RequestCorrelationService } from "../services/RequestCorrelationService";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

export class LoggerMiddleware {
  static handler =
    (name: string): RequestHandler =>
    (req, res, next) => {
      const correlationService = new RequestCorrelationService(req);

      const logger = new WinstonLogger(name, correlationService, []);

      res.locals.logger = logger;

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
}
