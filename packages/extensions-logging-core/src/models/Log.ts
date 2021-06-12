import {
  Literal,
  Number,
  Union,
  String,
  Record,
  Static,
  Unknown,
} from "runtypes";
import { Guid, Timestamp } from "@tsukiy0/extensions-core";

export const Log = Record({
  version: Union(Literal(1)),
  level: Number.withConstraint((_) => _ >= 0),
  timestamp: Timestamp,
  traceId: Guid,
  spanId: Guid,
  message: String,
  context: Unknown,
});

export type Log = Static<typeof Log>;
