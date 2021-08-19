import { GuidExtensions } from "../extensions/GuidExtensions";
import { TimestampExtensions } from "../extensions/TimestampExtensions";
import { Guid } from "../models/Guid";
import { Message } from "../models/Message";
import { MessageCorrelationService } from "./MessageCorrelationService";

describe("MessageCorrelationServiceTests", () => {
  const message: Message<Guid> = {
    header: {
      version: 1,
      traceId: GuidExtensions.generate(),
      created: TimestampExtensions.now(),
    },
    body: GuidExtensions.generate(),
  };

  describe("getTraceId", () => {
    it("when has header then return header", async () => {
      const sut = new MessageCorrelationService(message);

      const actual = sut.getTraceId();

      expect(actual).toEqual(message.header.traceId);
    });

    it("same instance returns same id", async () => {
      const sut = new MessageCorrelationService(message);

      const actual1 = sut.getTraceId();
      const actual2 = sut.getTraceId();

      expect(actual1).toEqual(actual2);
    });

    it("when bad header then return random id", async () => {
      const sut = new MessageCorrelationService({
        ...message,
        header: {
          ...message.header,
          traceId: "" as Guid,
        },
      });

      const actual = sut.getTraceId();

      expect(() => Guid.check(actual)).not.toThrowError();
    });
  });

  describe("getSpanId", () => {
    it("different instance return different id", async () => {
      const sut1 = new MessageCorrelationService(message);
      const sut2 = new MessageCorrelationService(message);

      const actual1 = sut1.getSpanId();
      const actual2 = sut2.getSpanId();

      expect(actual1).not.toEqual(actual2);
    });

    it("same instance returns same id", async () => {
      const sut = new MessageCorrelationService(message);

      const actual1 = sut.getSpanId();
      const actual2 = sut.getSpanId();

      expect(actual1).toEqual(actual2);
    });
  });
});
