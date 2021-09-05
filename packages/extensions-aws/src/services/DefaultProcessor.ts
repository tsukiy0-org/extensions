import {
  ICorrelationService,
  ILogger,
  IProcessor,
  Message,
  MessageCorrelationService,
} from "@tsukiy0/extensions-core";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

export abstract class DefaultProcessor<T, U> implements IProcessor<T, U> {
  protected correlationService: ICorrelationService = null!;
  protected logger: ILogger = null!;

  constructor(private readonly name: string) {}

  protected abstract handle: (message: Message<T>) => Promise<U>;

  run = async (message: Message<T>): Promise<U> => {
    this.correlationService = new MessageCorrelationService(message);
    this.logger = new WinstonLogger(this.name, this.correlationService);

    try {
      this.logger.info("TRANSACTION", { message });

      return await this.handle(message);
    } catch (e: Error) {
      this.logger.error(e);
      throw e;
    }
  };
}
