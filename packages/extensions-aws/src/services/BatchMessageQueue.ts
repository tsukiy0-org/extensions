import { Batch } from "aws-sdk";
import {
  Message,
  IMessageQueue,
  GuidExtensions,
} from "@tsukiy0/extensions-core";

type Config = {
  jobQueue: string;
  jobDefinition: string;
};

export class BatchMessageQueue<T> implements IMessageQueue<T> {
  public static readonly MESSAGE_KEY =
    "MESSAGE__937ce2c8dd7001baec1785cb8dce6e6fe1bcf61f";

  constructor(
    private readonly client: Batch,
    private readonly config: Config,
  ) {}

  static build = <T>(config: Config): BatchMessageQueue<T> => {
    return new BatchMessageQueue(new Batch(), config);
  };

  send = async (message: Message<T>): Promise<void> => {
    await this.client
      .submitJob({
        jobName: GuidExtensions.generate(),
        jobQueue: this.config.jobQueue,
        jobDefinition: this.config.jobDefinition,
        containerOverrides: {
          environment: [
            {
              name: BatchMessageQueue.MESSAGE_KEY,
              value: JSON.stringify(message),
            },
          ],
        },
      })
      .promise();
  };
}
