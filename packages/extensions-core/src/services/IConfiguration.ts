import { BaseError } from "../models/BaseError";

export interface IConfiguration {
  get(key: string): string;
}

export class ConfigurationNotFoundError extends BaseError {
  constructor(public readonly key: string) {
    super();
  }
}
