import { GuidExtensions } from "../extensions/GuidExtensions";
import { StaticCorrelationService } from "./StaticCorrelationService";

describe("StaticCorrelationService", () => {
  it("use ids from constructor", () => {
    const traceId = GuidExtensions.generate();
    const spanId = GuidExtensions.generate();
    const sut = new StaticCorrelationService(traceId, spanId);

    expect(sut.getTraceId()).toEqual(traceId);
    expect(sut.getSpanId()).toEqual(spanId);
  });

  it("when no ids provided then default", () => {
    const sut = new StaticCorrelationService();

    expect(sut.getTraceId()).toBeDefined();
    expect(sut.getSpanId()).toBeDefined();
  });
});
