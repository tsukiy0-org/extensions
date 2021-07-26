import { Timespan } from "../models/Timespan";

export class PromiseExtensions {
  static sleep = async (duration: Timespan): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, duration));
  };
}
