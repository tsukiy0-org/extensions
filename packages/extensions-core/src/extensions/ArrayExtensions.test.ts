import { ArrayExtensions } from "./ArrayExtensions";

describe("ArrayExtensions", () => {
  describe("chunk", () => {
    const arr = [1, 2, 3, 4, 5, 6];

    it("splits array into even chunks", () => {
      const actual = ArrayExtensions.chunk(arr, 2);

      expect(actual).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });

    it("when not perfectly divisible then last chunk will contain remainder", () => {
      const actual = ArrayExtensions.chunk(arr, 5);

      expect(actual).toEqual([[1, 2, 3, 4, 5], [6]]);
    });
  });
});
