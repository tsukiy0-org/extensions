import { GuidExtensions } from "./GuidExtensions";

describe("GuidExtensions", () => {
  describe("generate", () => {
    it("each is unique", () => {
      const a = GuidExtensions.generate();
      const b = GuidExtensions.generate();

      expect(a).not.toEqual(b);
    });
  });
});
