import { RequestHandler, Response } from "express";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";
import { GuidExtensions, ILogger } from "@tsukiy0/extensions-core";
import { CorrelationMiddleware } from "./CorrelationMiddleware";
import { promisifyHandler } from "packages/extensions-express/dist";

export class LoggerMiddleware {
  private readonly key = `logger_${this.name}_${GuidExtensions.generate()}`;
  constructor(
    private readonly name: string,
    private readonly correlationMiddleware: CorrelationMiddleware,
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const correlationService = this.correlationMiddleware.getService(res);

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
  });

  getLogger = (res: Response): ILogger => {
    return res.locals[this.key] as ILogger;
  };
}
