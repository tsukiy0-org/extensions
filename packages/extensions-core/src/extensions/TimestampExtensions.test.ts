import { TimestampExtensions as TimestampExtensions } from "./TimestampExtensions";

describe("TimeStampExtensions", () => {
  describe("fromDate", () => {
    it("creates from date", () => {
      const actual = TimestampExtensions.fromDate(
        new Date("2006-01-02T15:04:05+1100"),
      );

      expect(actual).toEqual(1136174645000);
    });
  });

  describe("toDate", () => {
    it("formats as date", () => {
      const date = new Date("2006-01-02T15:04:05+1100");
      const timestamp = TimestampExtensions.fromDate(date);

      const actual = TimestampExtensions.toDate(timestamp);

      expect(actual).toEqual(date);
    });
  });
});
