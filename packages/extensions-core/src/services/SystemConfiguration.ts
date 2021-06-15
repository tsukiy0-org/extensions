import { ConfigurationNotFoundError, IConfiguration } from "./IConfiguration";

export class SystemConfiguration implements IConfiguration {
  get = (key: string): string => {
    const value = process.env[key];

    if (!value) {
      throw new ConfigurationNotFoundError(key);
    }

    return value;
  };
}
