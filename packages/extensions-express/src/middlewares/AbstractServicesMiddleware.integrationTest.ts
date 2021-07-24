import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import fetch from "cross-fetch";

describe("AbstractServicesMiddleware", () => {
  const configuration = new SystemConfiguration();
  const apiUrl = Url.check(configuration.get("API_URL"));

  it("resolve services", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/services");

    const actual = await fetch(url);

    expect(await actual.json()).toEqual({
      testService: "test",
    });
  });
});
