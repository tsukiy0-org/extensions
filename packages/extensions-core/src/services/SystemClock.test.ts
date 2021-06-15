import { TimestampExtensions } from "../extensions/TimestampExtensions";
import { SystemClock } from "./SystemClock";

describe("SystemClock", () => {
  const sut = new SystemClock();

  it("returns date", () => {
    const date = new Date();
    Date.now = jest.fn().mockReturnValue(date);

    const actual = sut.now();

    expect(actual).toEqual(TimestampExtensions.fromDate(date));
  });
});
