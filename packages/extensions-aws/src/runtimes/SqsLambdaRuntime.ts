import {
  IProcessor,
  Message,
  MessageCorrelationService,
  NotFoundError,
} from "@tsukiy0/extensions-core";
import { SQSHandler } from "aws-lambda";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

export class SqsLambdaRuntime<T> {
  constructor(
    private readonly name: string,
    private readonly processor: IProcessor<T, void>,
  ) {}

  handler: SQSHandler = async (event) => {
    const record = event.Records[0];

    if (!record) {
      throw new SqsRecordNotFoundError();
    }

    const message: Message<T> = JSON.parse(record.body);

    const correlationService = new MessageCorrelationService(message);
    const logger = new WinstonLogger(this.name, correlationService);

    await this.processor.run(message.body, {
      correlationService,
      logger,
    });
  };
}

export class SqsRecordNotFoundError extends NotFoundError {}
