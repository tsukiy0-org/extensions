import UUID from "pure-uuid";
import { Guid } from "../models/Guid";

export class GuidExtensions {
  static generate = (): Guid => {
    return Guid.check(new UUID(4).toString());
  };
}
