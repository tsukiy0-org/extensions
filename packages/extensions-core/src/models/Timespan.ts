import { Static, Number } from "runtypes";

export const Timespan = Number.withConstraint((_) => _ >= 0).withBrand(
  "Timespan",
);

export type Timespan = Static<typeof Timespan>;
