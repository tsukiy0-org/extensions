import { GuidExtensions } from "../extensions/GuidExtensions";
import { Guid } from "../models/Guid";
import { ICorrelationService } from "./ICorrelationService";

export class StaticCorrelationService implements ICorrelationService {
  constructor(
    private readonly traceId: Guid = GuidExtensions.generate(),
    private readonly spanId: Guid = GuidExtensions.generate(),
  ) {}

  getTraceId = (): Guid => {
    return this.traceId;
  };
  getSpanId = (): Guid => {
    return this.spanId;
  };
}
