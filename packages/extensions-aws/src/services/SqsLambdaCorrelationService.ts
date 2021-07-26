import {
  Guid,
  GuidExtensions,
  ICorrelationService,
} from "@tsukiy0/extensions-core";
import { SQSRecord } from "aws-lambda";

export class SqsLambdaCorrelationService implements ICorrelationService {
  private readonly traceId: Guid;
  private readonly spanId: Guid;

  constructor(record: SQSRecord) {
    this.traceId = this.extractTraceId(record);
    this.spanId = GuidExtensions.generate();
  }

  getTraceId = (): Guid => {
    return this.traceId;
  };

  getSpanId = (): Guid => {
    return this.spanId;
  };

  private extractTraceId = (record: SQSRecord): Guid => {
    try {
      console.log(record);
      console.log(
        "traceId",
        record.messageAttributes["x-trace-id"].stringValue,
      );
      return Guid.check(record.messageAttributes["x-trace-id"].stringValue);
    } catch {
      return GuidExtensions.generate();
    }
  };
}
