import { SQS } from "aws-sdk";
import { Url, IQueue, ICorrelationService } from "@tsukiy0/extensions-core";

export class SqsQueue<T> implements IQueue<T> {
  constructor(
    private readonly client: SQS,
    private readonly queueUrl: Url,
    private readonly correlationService: ICorrelationService,
  ) {}

  static build = <T>(
    queueUrl: Url,
    correlationService: ICorrelationService,
  ): SqsQueue<T> => {
    return new SqsQueue(new SQS(), queueUrl, correlationService);
  };

  send = async (message: T): Promise<void> => {
    await this.client
      .sendMessage({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(message),
        MessageAttributes: {
          "x-trace-id": {
            StringValue: this.correlationService.getTraceId() as string,
            DataType: "String",
          },
        },
      })
      .promise();
  };
}
