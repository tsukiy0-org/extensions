import {
  ICorrelationService,
  TimestampExtensions,
  ErrorLog,
  ILogger,
  Log,
  StaticCorrelationService,
} from "@tsukiy0/extensions-core";
import { MESSAGE } from "triple-beam";
import { createLogger, Logger, LoggerOptions, format } from "winston";
import { Console } from "winston/lib/winston/transports";

export class WinstonLogger implements ILogger {
  private readonly logger: Logger;

  constructor(
    private readonly name: string,
    private readonly correlationService: ICorrelationService = new StaticCorrelationService(),
    transports: LoggerOptions["transports"] = [],
  ) {
    const jsonFormatter = format((info) => {
      return {
        ...info,
        [MESSAGE]: JSON.stringify(info.log),
      };
    })();

    if (transports instanceof Array) {
      this.logger = createLogger({
        format: jsonFormatter,
        transports: [...transports, new Console()],
      });
    } else {
      this.logger = createLogger({
        format: jsonFormatter,
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
      message: "ignored",
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
      message: "ignored",
      log,
    });
  };

  private extractDataFromError = (error: Error) => {
    const { message, stack, ...rest } = error;
    return rest;
  };
}
