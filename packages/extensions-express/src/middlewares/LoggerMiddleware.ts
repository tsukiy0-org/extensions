import { RequestHandler, Response } from "express";
import { RequestCorrelationService } from "../services/RequestCorrelationService";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";
import { GuidExtensions, ILogger } from "@tsukiy0/extensions-core";

export class LoggerMiddleware {
  private readonly key: string;
  constructor(private readonly name: string) {
    this.key = this.buildKey(name);
  }

  handler: RequestHandler = (req, res, next) => {
    const correlationService = new RequestCorrelationService(req);

    const logger = new WinstonLogger(this.name, correlationService, []);

    res.locals[this.key] = logger;

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

  getLogger = (res: Response): ILogger => {
    return res.locals[this.key] as ILogger;
  };

  private readonly buildKey = (name: string): string => {
    const id = GuidExtensions.generate();
    return `logger_${name}_${id}`;
  };
}
