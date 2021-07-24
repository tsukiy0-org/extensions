import {
  GuidExtensions,
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import fetch from "cross-fetch";

describe("CorrelationMiddleware", () => {
  const configuration = new SystemConfiguration();
  const apiUrl = Url.check(configuration.get("API_URL"));

  it("when send trace id then returns that", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/correlation");
    const traceId = GuidExtensions.generate();

    const actual = await fetch(url, {
      headers: {
        "x-trace-id": traceId,
      },
    });

    expect(await actual.json()).toEqual({
      traceId,
      spanId: expect.any(String),
    });
  });

  it("when no trace id then returns random", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/correlation");

    const actual = await fetch(url);

    expect(await actual.json()).toEqual({
      traceId: expect.any(String),
      spanId: expect.any(String),
    });
  });
});
