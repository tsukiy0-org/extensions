import { IProcessor, NotFoundError } from "@tsukiy0/extensions-core";
import { SQSHandler } from "aws-lambda";

export class SqsLambdaRuntime<T> {
  constructor(private readonly processor: IProcessor<T, void>) {}

  handler: SQSHandler = async (event) => {
    const record = event.Records[0];

    if (!record) {
      throw new SqsRecordNotFoundError();
    }

    const message = JSON.parse(record.body);

    await this.processor.run(message);
  };
}

export class SqsRecordNotFoundError extends NotFoundError {}
