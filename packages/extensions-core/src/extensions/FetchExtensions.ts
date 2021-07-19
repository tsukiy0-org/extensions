import { FetchError } from "../models/FetchError";

export class FetchExtensions {
  static checkSuccess = async (
    response: Response,
    acceptedStatuses: number[],
  ): Promise<void> => {
    if (!acceptedStatuses.includes(response.status)) {
      const body = await response.text();
      throw new FetchError(response.status, body);
    }
  };
}
