import { Message } from "../models/Message";
import { ICorrelationService } from "./ICorrelationService";
import { ILogger } from "./ILogger";
import { IProcessor } from "./IProcessor";
import { MessageCorrelationService } from "./MessageCorrelationService";

export abstract class DefaultProcessor<T, U> implements IProcessor<T, U> {
  protected correlationService: ICorrelationService = null!;
  protected logger: ILogger = null!;

  protected abstract handle: (message: Message<T>) => Promise<U>;
  protected abstract getLogger: () => Promise<ILogger>;

  run = async (message: Message<T>): Promise<U> => {
    this.correlationService = new MessageCorrelationService(message);
    this.logger = await this.getLogger();

    try {
      this.logger.info("TRANSACTION START", { message });

      const res = await this.handle(message);

      this.logger.info("TRANSACTION SUCCEEDED");

      return res;
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(e, "TRANSACTION FAILED");
      }
      throw e;
    }
  };
}
