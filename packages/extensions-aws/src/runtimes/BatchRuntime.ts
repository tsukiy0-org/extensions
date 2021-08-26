import { IProcessor, SystemConfiguration } from "@tsukiy0/extensions-core";
import { BatchMessageQueue } from "../services/BatchMessageQueue";

export class BatchRuntime<T> {
  constructor(private readonly processor: IProcessor<T, void>) {}

  run = async (): Promise<void> => {
    const config = new SystemConfiguration();
    const rawMessage = config.get(BatchMessageQueue.MESSAGE_KEY);
    const message = JSON.parse(rawMessage);

    await this.processor.run(message);
  };
}
