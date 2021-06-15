import { Guid } from "@tsukiy0/extensions-core";

export interface ICorrelationService {
  getTraceId(): Guid;
  getSpanId(): Guid;
}
