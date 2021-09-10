import { SQS } from "aws-sdk";
import { Url, Message, IMessageQueue } from "@tsukiy0/extensions-core";

export class SqsMessageQueue<T> implements IMessageQueue<T> {
  constructor(private readonly client: SQS, private readonly queueUrl: Url) {}

  static build = <T>(queueUrl: Url): SqsMessageQueue<T> => {
    return new SqsMessageQueue(new SQS(), queueUrl);
  };

  send = async (message: Message<T>): Promise<void> => {
    await this.client
      .sendMessage({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(message),
      })
      .promise();
  };

  purge = async (): Promise<void> => {
    await this.client
      .purgeQueue({
        QueueUrl: this.queueUrl,
      })
      .promise();
  };
}
