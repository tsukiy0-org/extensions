import { Guid, GuidExtensions } from "@tsukiy0/extensions-core";
import { SqsLambdaCorrelationService } from "./SqsLambdaCorrelationService";
import { SQSRecord } from "aws-lambda";

describe("SqsLambdaCorrelationService", () => {
  const traceId = GuidExtensions.generate();
  const record: SQSRecord = {
    messageAttributes: {
      "x-trace-id": {
        stringValue: traceId,
        stringListValues: [],
        binaryListValues: [],
        dataType: "String",
      },
    },
  } as any;

  describe("getTraceId", () => {
    it("when has attribute then return attribute", async () => {
      const sut = new SqsLambdaCorrelationService(record);

      const actual = sut.getTraceId();

      expect(actual).toEqual(traceId);
    });

    it("same instance returns same id", async () => {
      const sut = new SqsLambdaCorrelationService(record);

      const actual1 = sut.getTraceId();
      const actual2 = sut.getTraceId();

      expect(actual1).toEqual(actual2);
    });

    it("when bad header then return random id", async () => {
      const sut = new SqsLambdaCorrelationService({
        ...record,
        messageAttributes: {
          "x-trace-id": {
            ...record.messageAttributes["x-trace-id"],
            stringValue: "gibberish",
          },
        },
      });

      const actual = sut.getTraceId();

      expect(() => Guid.check(actual)).not.toThrowError();
    });
  });

  describe("getSpanId", () => {
    it("different instance return different id", async () => {
      const sut1 = new SqsLambdaCorrelationService(record);
      const sut2 = new SqsLambdaCorrelationService(record);

      const actual1 = sut1.getSpanId();
      const actual2 = sut2.getSpanId();

      expect(actual1).not.toEqual(actual2);
    });

    it("same instance returns same id", async () => {
      const sut = new SqsLambdaCorrelationService(record);

      const actual1 = sut.getSpanId();
      const actual2 = sut.getSpanId();

      expect(actual1).toEqual(actual2);
    });
  });
});
