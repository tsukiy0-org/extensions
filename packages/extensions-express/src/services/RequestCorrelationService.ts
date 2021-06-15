import { Request } from "express";
import { ICorrelationService } from "@tsukiy0/extensions-logging-core";
import { Guid, GuidExtensions } from "@tsukiy0/extensions-core";

export class RequestCorrelationService implements ICorrelationService {
  private readonly traceId: Guid;
  private readonly spanId: Guid;

  constructor(request: Request) {
    this.traceId = this.cacheTraceId(request);
    this.spanId = GuidExtensions.generate();
  }

  getTraceId = (): Guid => {
    return this.traceId;
  };

  getSpanId = (): Guid => {
    return this.spanId;
  };

  private cacheTraceId = (request: Request) => {
    try {
      const traceId = request.header("x-trace-id");

      if (!traceId) {
        return GuidExtensions.generate();
      }

      return Guid.check(traceId);
    } catch {
      return GuidExtensions.generate();
    }
  };
}
