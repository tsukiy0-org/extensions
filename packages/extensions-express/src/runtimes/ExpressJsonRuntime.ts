import {
  IProcessor,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@tsukiy0/extensions-core";
import { RequestHandler, Response } from "express";
import { promisifyHandler } from "../helpers/promisifyHandler";
import { ValidationError as RuntypesValidationError } from "runtypes";
import { RequestCorrelationService } from "../services/RequestCorrelationService";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

export class ExpressJsonRuntime<T, U> {
  constructor(
    private readonly name: string,
    private readonly processor: IProcessor<T, U>,
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    try {
      const correlationService = new RequestCorrelationService(req);
      const logger = new WinstonLogger(this.name, correlationService);

      logger.info("request body", {
        body: req.body
      })

      const r = await this.processor.run(req.body, {
        correlationService,
        logger,
      });

      return res.status(200).json(r);
    } catch (e) {
      return this.handleError(e, res);
    }
  });

  private handleError = (e: any, res: Response) => {
    if (e instanceof RuntypesValidationError || e instanceof ValidationError) {
      return res.status(400).end();
    }

    if (e instanceof NotFoundError) {
      return res.status(404).end();
    }

    if (e instanceof UnauthorizedError) {
      return res.status(401).end();
    }

    return res.status(500).end();
  };
}

export class SqsRecordNotFoundError extends NotFoundError {}
