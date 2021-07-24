import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import fetch from "cross-fetch";

describe("FileMiddleware", () => {
  const configuration = new SystemConfiguration();
  const apiUrl = Url.check(configuration.get("API_URL"));

  it("caches *.png glob correctly", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/static/image.png");

    const actual = await fetch(url);

    expect(actual.headers.get("Cache-Control")).toEqual("max-age=200");
  });

  it("caches *.jpg glob correctly", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/static/image.jpg");

    const actual = await fetch(url);

    expect(actual.headers.get("Cache-Control")).toEqual("max-age=100");
  });
});
