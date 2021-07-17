import { ErrorRequestHandler } from "express";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@tsukiy0/extensions-core";
import { ValidationError as RuntypesValidationError } from "runtypes";
import { LoggerMiddleware } from "./LoggerMiddleware";

export class ErrorMiddleware {
  constructor(private readonly loggerMiddleware: LoggerMiddleware) {}

  handler: ErrorRequestHandler = (err, req, res, next) => {
    const logger = this.loggerMiddleware.getLogger(res);

    logger.error(err);

    if (
      err instanceof RuntypesValidationError ||
      err instanceof ValidationError
    ) {
      return res.status(400).end();
    }

    if (err instanceof NotFoundError) {
      return res.status(404).end();
    }

    if (err instanceof UnauthorizedError) {
      return res.status(401).end();
    }

    return res.status(500).end();
  };
}
