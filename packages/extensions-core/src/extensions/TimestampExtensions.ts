import { Timestamp } from "../models/Timestamp";

export class TimestampExtensions {
  static now = (): Timestamp => {
    return TimestampExtensions.fromDate(new Date());
  };

  static fromDate = (input: Date): Timestamp => {
    return Timestamp.check(input.getTime());
  };

  static toDate = (input: Timestamp): Date => {
    return new Date(input);
  };
}
