import { Guid } from "@tsukiy0/extensions-core";

export interface ICorrelationService {
  getName(): string;
  getTraceId(): Guid;
  getSpanId(): Guid;
}
