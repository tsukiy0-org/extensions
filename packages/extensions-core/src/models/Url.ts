import { Static, String } from "runtypes";

export const Url = String.withConstraint((_) => {
  try {
    new URL(_);
    return true;
  } catch {
    return false;
  }
}).withBrand("Url");

export type Url = Static<typeof Url>;
