import { GuidExtensions } from "../extensions/GuidExtensions";
import { TimestampExtensions } from "../extensions/TimestampExtensions";
import { DefaultQueue } from "./DefaultQueue";
import { IClock } from "./IClock";
import { ICorrelationService } from "./ICorrelationService";
import { IMessageQueue } from "./IMessageQueue";

class TestQueue extends DefaultQueue<string> {}

describe("DefaultQueue", () => {
  let correlationService: ICorrelationService;
  let messageQueue: IMessageQueue<string>;
  let clock: IClock;
  let sut: DefaultQueue<string>;

  beforeEach(() => {
    correlationService = {} as ICorrelationService;
    messageQueue = {} as IMessageQueue<string>;
    clock = {} as IClock;
    sut = new TestQueue(messageQueue, correlationService, clock);
  });

  it("sends with default header", async () => {
    const traceId = GuidExtensions.generate();
    const body = "test";
    const now = TimestampExtensions.now();
    correlationService.getTraceId = jest.fn().mockReturnValue(traceId);
    clock.now = jest.fn().mockReturnValue(now);
    messageQueue.send = jest.fn();

    await sut.send(body);

    expect(messageQueue.send).toHaveBeenCalledWith({
      header: {
        version: 1,
        traceId: traceId,
        created: now,
      },
      body,
    });
  });
});
