import {
  ICorrelationService,
  NotFoundError,
  StaticCorrelationService,
} from "@tsukiy0/extensions-core";
import { SQSHandler } from "aws-lambda";
import { SqsLambdaCorrelationService } from "../services/SqsLambdaCorrelationService";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

export abstract class SqsLambdaRuntime<T> {
  protected correlationService: ICorrelationService =
    new StaticCorrelationService();

  protected abstract handle: (message: T) => Promise<void>;

  handler: SQSHandler = async (event) => {
    const record = event.Records[0];

    if (!record) {
      throw new SqsRecordNotFoundError();
    }

    this.correlationService = new SqsLambdaCorrelationService(record);
    const logger = new WinstonLogger(
      "SqsLambdaRuntime",
      this.correlationService,
    );

    try {
      logger.info("TRANSACTION", { record });
      const message = JSON.parse(record.body);

      await this.handle(message);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };
}

export class SqsRecordNotFoundError extends NotFoundError {}
