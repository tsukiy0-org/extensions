import { Timespan } from "../models/Timespan";
import { ArrayExtensions } from "./ArrayExtensions";

export class PromiseExtensions {
  static sleep = async (duration: Timespan): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, duration));
  };

  static allBatched = async <T>(
    promises: Promise<T>[],
    batchSize: number,
  ): Promise<T[]> => {
    const batches = ArrayExtensions.chunk(promises, batchSize);

    let results: T[] = [];

    for (const batch of batches) {
      const result = await Promise.all(batch);
      results = results.concat(result);
    }

    return results;
  };
}
