import { Static, Number } from "runtypes";

export const Timestamp = Number.withConstraint((_) => _ >= 0).withBrand(
  "Timestamp",
);

export type Timestamp = Static<typeof Timestamp>;
