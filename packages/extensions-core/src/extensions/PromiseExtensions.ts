import { Timespan } from "packages/extensions-core/dist";

export class PromiseExtensions {
  static sleep = async (duration: Timespan): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, duration));
  };
}
