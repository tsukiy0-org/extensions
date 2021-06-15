import { Timestamp } from "../models/Timestamp";

export interface IClock {
  now(): Timestamp;
}
