import { PromiseExtensions } from "./PromiseExtensions";
import { TimespanExtensions } from "./TimespanExtensions";

describe("PromiseExtensions", () => {
  describe("sleep", () => {
    it("sleeps for given duration", async () => {
      const duration = TimespanExtensions.seconds(2);
      const before = new Date().getTime();

      await PromiseExtensions.sleep(duration);
      const after = new Date().getTime();

      expect(after - before).toBeGreaterThanOrEqual(duration);
    });
  });
});
