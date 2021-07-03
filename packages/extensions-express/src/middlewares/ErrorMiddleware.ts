import { ErrorRequestHandler } from "express";
import {
  ILogger,
  UnauthorizedError,
  ValidationError,
} from "@tsukiy0/extensions-core";
import { ValidationError as RuntypesValidationError } from "runtypes";

export class ErrorMiddleware {
  static handler: ErrorRequestHandler = (err, req, res, next) => {
    const logger: ILogger = res.locals.logger;

    logger.error(err);

    if (
      err instanceof RuntypesValidationError ||
      err instanceof ValidationError
    ) {
      return res.send(400).end();
    }

    if (err instanceof UnauthorizedError) {
      return res.send(401).end();
    }

    return res.send(500).end();
  };
}
