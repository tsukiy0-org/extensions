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

  describe("allBatched", () => {
    it("resolves all promises", async () => {
      const actual = await PromiseExtensions.allBatched(
        [1, 2, 3].map((_) => Promise.resolve(_)),
        2,
      );

      expect(actual).toEqual([1, 2, 3]);
    });
  });
});
