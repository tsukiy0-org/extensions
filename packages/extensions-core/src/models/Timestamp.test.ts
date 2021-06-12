import { Timestamp } from "./Timestamp";

describe("TimeStamp", () => {
  it("when less than 0 then throw", () => {
    const action = () => Timestamp.check(-1);

    expect(action).toThrowError();
  });
});
