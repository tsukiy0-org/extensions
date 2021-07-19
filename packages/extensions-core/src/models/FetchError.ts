import { BaseError } from "@tsukiy0/extensions-core";

export class FetchError extends BaseError {
  constructor(
    public readonly status: Response["status"],
    public readonly body: string,
  ) {
    super();
  }
}
