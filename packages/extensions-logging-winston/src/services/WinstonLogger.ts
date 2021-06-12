import { ErrorLog, ILogger, Log } from "@tsukiy0/extensions-logging-core";
import { Guid, TimestampExtensions } from "@tsukiy0/extensions-core";
import { createLogger, Logger, LoggerOptions, format } from "winston";
import { Console } from "winston/lib/winston/transports";

export class WinstonLogger implements ILogger {
  private readonly logger: Logger;

  constructor(
    private readonly traceId: Guid,
    private readonly spanId: Guid,
    transports: LoggerOptions["transports"],
  ) {
    const fmt = format.printf((data) => {
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
      timestamp: TimestampExtensions.now(),
      traceId: this.traceId,
      spanId: this.spanId,
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
      timestamp: TimestampExtensions.now(),
      traceId: this.traceId,
      spanId: this.spanId,
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
