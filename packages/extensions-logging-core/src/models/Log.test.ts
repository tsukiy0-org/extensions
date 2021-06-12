import { GuidExtensions, TimestampExtensions } from "@tsukiy0/extensions-core";
import { Log } from "./Log";

describe("Log", () => {
  const log: Log = {
    version: 1,
    level: 1,
    name: "TestLogger",
    timestamp: TimestampExtensions.fromDate(new Date()),
    traceId: GuidExtensions.generate(),
    spanId: GuidExtensions.generate(),
    message: "message",
    context: {
      hello: "bye",
    },
  };

  it("good", () => {
    Log.check(log);
  });

  it("level cannot be less than 0", () => {
    const action = () =>
      Log.check({
        ...log,
        level: -1,
      });

    expect(action).toThrowError();
  });
});
