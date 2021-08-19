import { Number, Record, Static } from "runtypes";
import { Guid } from "./Guid";
import { Timestamp } from "./Timestamp";

export const MessageHeader = Record({
  version: Number,
  traceId: Guid,
  created: Timestamp,
});

export type MessageHeader = Static<typeof MessageHeader>;
