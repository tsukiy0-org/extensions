import {
  ErrorLog,
  ICorrelationService,
  ILogger,
  Log,
} from "@tsukiy0/extensions-logging-core";
import { TimestampExtensions } from "@tsukiy0/extensions-core";
import { createLogger, Logger, LoggerOptions } from "winston";
import printf from "logform/printf";
import { Console } from "winston/lib/winston/transports";

export class WinstonLogger implements ILogger {
  private readonly logger: Logger;

  constructor(
    private readonly name: string,
    private readonly correlationService: ICorrelationService,
    transports: LoggerOptions["transports"],
  ) {
    const fmt = printf((data) => {
      return JSON.stringify(data.log);
    });

    if (transports instanceof Array) {
      this.logger = createLogger({
        format: fmt,
        transports: [...transports, new Console()],
      });
    } else {
      this.logger = createLogger({
        format: fmt,
        transports,
      });
    }
  }

  info = (message: string, context?: any): void => {
    const log: Log = {
      version: 1,
      level: 20,
      name: this.name,
      timestamp: TimestampExtensions.now(),
      traceId: this.correlationService.getTraceId(),
      spanId: this.correlationService.getSpanId(),
      message,
      context,
    };

    this.logger.info({
      message,
      log,
    });
  };

  error = (error: Error, message?: string, context?: any): void => {
    const log: ErrorLog = {
      version: 1,
      level: 50,
      name: this.name,
      timestamp: TimestampExtensions.now(),
      traceId: this.correlationService.getTraceId(),
      spanId: this.correlationService.getSpanId(),
      message: message ?? error.message,
      context,
      exception: {
        type: error.name,
        message: error.message,
        stackTrace: error.stack!,
        context: this.extractDataFromError(error),
      },
    };

    this.logger.error({
      message,
      log,
    });
  };

  private extractDataFromError = (error: Error) => {
    const { message, stack, ...rest } = error;
    return rest;
  };
}
