import { SQS } from "aws-sdk";
import { Url, IQueue, Message } from "@tsukiy0/extensions-core";

export class SqsQueue<T> implements IQueue<T> {
  constructor(private readonly client: SQS, private readonly queueUrl: Url) {}

  static build = <T>(queueUrl: Url): SqsQueue<T> => {
    return new SqsQueue(new SQS(), queueUrl);
  };

  send = async (message: Message<T>): Promise<void> => {
    await this.client
      .sendMessage({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(message),
      })
      .promise();
  };
}
