import { Url } from "../models/Url";
import { join } from "path";

export class UrlExtensions {
  static fromURL = (input: URL): Url => {
    return Url.check(input.toString());
  };

  static appendPath = (url: Url, path: string): Url => {
    const newUrl = new URL(url);
    newUrl.pathname = join(newUrl.pathname, path);
    return UrlExtensions.fromURL(newUrl);
  };

  static appendQuery = (url: Url, query: Record<string, string>): Url => {
    const newUrl = new URL(url);
    Object.entries(query).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value);
    });
    return UrlExtensions.fromURL(newUrl);
  };
}
