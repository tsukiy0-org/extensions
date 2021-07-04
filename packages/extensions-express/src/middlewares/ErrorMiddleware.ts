import { ErrorRequestHandler } from "express";
import { UnauthorizedError, ValidationError } from "@tsukiy0/extensions-core";
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
      return res.send(400).end();
    }

    if (err instanceof UnauthorizedError) {
      return res.send(401).end();
    }

    return res.send(500).end();
  };
}
