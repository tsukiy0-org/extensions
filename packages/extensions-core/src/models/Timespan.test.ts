import { Timespan } from "./Timespan";

describe("TimeStamp", () => {
  it("when less than 0 then throw", () => {
    const action = () => Timespan.check(-1);

    expect(action).toThrowError();
  });
});
