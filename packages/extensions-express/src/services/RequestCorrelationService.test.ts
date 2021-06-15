import { Guid, GuidExtensions } from "@tsukiy0/extensions-core";
import { RequestCorrelationService } from "./RequestCorrelationService";

describe("RequestCorrelationService", () => {
  describe("getTraceId", () => {
    it("when has header then return header", async () => {
      const traceId = GuidExtensions.generate();
      const sut = new RequestCorrelationService({
        header: jest.fn().mockReturnValue(traceId),
      } as any);

      const actual = sut.getTraceId();

      expect(actual).toEqual(traceId);
    });

    it("same instance returns same id", async () => {
      const traceId = GuidExtensions.generate();
      const sut = new RequestCorrelationService({
        header: jest.fn().mockReturnValue(traceId),
      } as any);

      const actual1 = sut.getTraceId();
      const actual2 = sut.getTraceId();

      expect(actual1).toEqual(actual2);
    });

    it("when bad header then return random id", async () => {
      const sut = new RequestCorrelationService({
        header: jest.fn().mockReturnValue("gibberish"),
      } as any);

      const actual = sut.getTraceId();

      expect(() => Guid.check(actual)).not.toThrowError();
    });
  });

  describe("getSpanId", () => {
    it("different instance return different id", async () => {
      const traceId = GuidExtensions.generate();
      const sut1 = new RequestCorrelationService({
        header: jest.fn().mockReturnValue(traceId),
      } as any);
      const sut2 = new RequestCorrelationService({
        header: jest.fn().mockReturnValue(traceId),
      } as any);

      const actual1 = sut1.getSpanId();
      const actual2 = sut2.getSpanId();

      expect(actual1).not.toEqual(actual2);
    });

    it("same instance returns same id", async () => {
      const traceId = GuidExtensions.generate();
      const sut = new RequestCorrelationService({
        header: jest.fn().mockReturnValue(traceId),
      } as any);

      const actual1 = sut.getSpanId();
      const actual2 = sut.getSpanId();

      expect(actual1).toEqual(actual2);
    });
  });
});
