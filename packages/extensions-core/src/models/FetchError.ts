import { BaseError } from "./BaseError";

export class FetchError extends BaseError {
  constructor(
    public readonly status: Response["status"],
    public readonly body: string,
  ) {
    super();
  }
}
