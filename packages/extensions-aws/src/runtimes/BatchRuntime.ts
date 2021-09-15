import {
  IProcessor,
  Message,
  MessageCorrelationService,
  SystemConfiguration,
} from "@tsukiy0/extensions-core";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";
import { BatchMessageQueue } from "../services/BatchMessageQueue";

export class BatchRuntime<T> {
  constructor(
    private readonly name: string,
    private readonly processor: IProcessor<T, void>,
  ) {}

  run = async (): Promise<void> => {
    const config = new SystemConfiguration();
    const rawMessage = config.get(BatchMessageQueue.MESSAGE_KEY);
    const message: Message<T> = JSON.parse(rawMessage);

    const correlationService = new MessageCorrelationService(message);
    const logger = new WinstonLogger(this.name, correlationService);

    await this.processor.run(message.body, {
      correlationService,
      logger,
    });
  };
}
