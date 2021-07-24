import { Timespan } from "../models/Timespan";

export class TimespanExtensions {
  static minutes = (input: number): Timespan => {
    return Timespan.check(input * 60000);
  };

  static seconds = (input: number): Timespan => {
    return Timespan.check(input * 1000);
  };

  static hours = (input: number): Timespan => {
    return Timespan.check(input * 3600000);
  };

  static toSeconds = (input: Timespan): number => {
    return input / 1000;
  };
}
