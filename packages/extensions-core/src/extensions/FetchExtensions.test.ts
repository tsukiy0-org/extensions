import { FetchError } from "../models/FetchError";
import { FetchExtensions } from "./FetchExtensions";

describe("FetchExtensions", () => {
  describe("checkSuccess", () => {
    const response = {
      status: 200,
      text: async () => "test",
    } as Response;

    it("when has accepted status then returns", async () => {
      await FetchExtensions.checkSuccess(response, [response.status]);
    });

    it("when no accepted status then throw", async () => {
      await expect(
        FetchExtensions.checkSuccess(response, [201]),
      ).rejects.toThrowError(FetchError);
    });
  });
});
