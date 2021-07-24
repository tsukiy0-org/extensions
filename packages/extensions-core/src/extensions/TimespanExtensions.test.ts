import { TimespanExtensions } from "./TimespanExtensions";

describe("TimespanExtensions", () => {
  it("3600 seconds in an hour", () => {
    const hour = TimespanExtensions.hours(1);
    const second = TimespanExtensions.seconds(1);

    const actual = hour / second;

    expect(actual).toEqual(3600);
  });

  it("60 minutes in an hour", () => {
    const hour = TimespanExtensions.hours(1);
    const minute = TimespanExtensions.minutes(1);

    const actual = hour / minute;

    expect(actual).toEqual(60);
  });
});
