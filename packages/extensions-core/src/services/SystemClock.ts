import { TimestampExtensions } from "../extensions/TimestampExtensions";
import { Timestamp } from "../models/Timestamp";
import { IClock } from "./IClock";

export class SystemClock implements IClock {
  now = (): Timestamp => {
    return TimestampExtensions.now();
  };
}
