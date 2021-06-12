import { Static, String } from "runtypes";
import UUID from "pure-uuid";

export const Guid = String.withConstraint((_) => {
  try {
    new UUID(_);
    return true;
  } catch {
    return false;
  }
}).withBrand("Guid");

export type Guid = Static<typeof Guid>;
