import { Guid } from "./Guid";

describe("Guid", () => {
  it("when not guid then throw", () => {
    const action = () => Guid.check("not-a-guid");

    expect(action).toThrowError();
  });
});
