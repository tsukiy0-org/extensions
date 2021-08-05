import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import fetch from "cross-fetch";

describe("ApiKeyAuthMiddleware", () => {
  const configuration = new SystemConfiguration();
  const apiUrl = Url.check(configuration.get("API_URL"));

  it("when send correct api key then return matching key name", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/apiKeyAuth");

    const actual = await fetch(url, {
      headers: {
        "x-api-key": "abc123",
      },
    });

    expect(await actual.json()).toEqual({
      keyName: "test",
    });
  });

  it("when send bad api key then unauthorized", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/apiKeyAuth");

    const actual = await fetch(url, {
      headers: {
        "x-api-key": "bad",
      },
    });

    expect(actual.status).toEqual(401);
  });

  it("when send no api key then unauthorized", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/apiKeyAuth");

    const actual = await fetch(url);

    expect(actual.status).toEqual(401);
  });
});
