import { IClock } from "./IClock";
import { ICorrelationService } from "./ICorrelationService";
import { IMessageQueue } from "./IMessageQueue";
import { IQueue } from "./IQueue";

export abstract class DefaultQueue<T> implements IQueue<T> {
  constructor(
    private readonly messageQueue: IMessageQueue<T>,
    private readonly correlationService: ICorrelationService,
    private readonly clock: IClock,
  ) {}

  send = async (body: T): Promise<void> => {
    await this.messageQueue.send({
      header: {
        version: 1,
        traceId: this.correlationService.getTraceId(),
        created: this.clock.now(),
      },
      body,
    });
  };
}
