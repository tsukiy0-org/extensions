import {
  ICorrelationService,
  Message,
  MessageCorrelationService,
  NotFoundError,
  StaticCorrelationService,
} from "@tsukiy0/extensions-core";
import { SQSHandler } from "aws-lambda";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

export abstract class SqsLambdaRuntime<T> {
  protected correlationService: ICorrelationService =
    new StaticCorrelationService();

  protected abstract handle: (message: Message<T>) => Promise<void>;

  handler: SQSHandler = async (event) => {
    const record = event.Records[0];

    if (!record) {
      throw new SqsRecordNotFoundError();
    }

    const message = JSON.parse(record.body);
    this.correlationService = new MessageCorrelationService(message);
    const logger = new WinstonLogger(
      "SqsLambdaRuntime",
      this.correlationService,
    );

    try {
      logger.info("TRANSACTION", { record });

      await this.handle(message);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };
}

export class SqsRecordNotFoundError extends NotFoundError {}
