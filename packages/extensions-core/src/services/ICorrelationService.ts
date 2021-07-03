import { Guid } from "../models/Guid";

export interface ICorrelationService {
  getTraceId(): Guid;
  getSpanId(): Guid;
}
