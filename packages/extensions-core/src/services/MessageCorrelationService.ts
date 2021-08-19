import { GuidExtensions } from "../extensions/GuidExtensions";
import { Guid } from "../models/Guid";
import { Message } from "../models/Message";
import { ICorrelationService } from "./ICorrelationService";

export class MessageCorrelationService<T> implements ICorrelationService {
  private readonly traceId: Guid;
  private readonly spanId: Guid;

  constructor(message: Message<T>) {
    this.traceId = this.cacheTraceId(message);
    this.spanId = GuidExtensions.generate();
  }

  getTraceId = (): Guid => {
    return this.traceId;
  };

  getSpanId = (): Guid => {
    return this.spanId;
  };

  private cacheTraceId = (message: Message<T>) => {
    try {
      if (!message.header.traceId) {
        return GuidExtensions.generate();
      }

      return Guid.check(message.header.traceId);
    } catch {
      return GuidExtensions.generate();
    }
  };
}
