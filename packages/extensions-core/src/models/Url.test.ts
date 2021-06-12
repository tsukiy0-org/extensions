import { Url } from "./Url";

describe("Url", () => {
  it("when not url then throw", () => {
    const action = () => Url.check("not-a-url");

    expect(action).toThrowError();
  });
});
