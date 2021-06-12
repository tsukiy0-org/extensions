import { Static, Number } from "runtypes";

export const Timestamp = Number.withConstraint((_) => _ >= 0).withBrand(
  "TimeStamp",
);

export type Timestamp = Static<typeof Timestamp>;
