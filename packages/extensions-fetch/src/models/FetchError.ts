import { BaseError } from "@tsukiy0/extensions-core";

export class HttpError extends BaseError {
  constructor(public readonly status: number, public readonly body: string) {
    super();
  }
}
