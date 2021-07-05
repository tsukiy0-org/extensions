import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import fetch from "cross-fetch";

describe("ErrorMiddleware", () => {
  const configuration = new SystemConfiguration();
  const apiUrl = Url.check(configuration.get("API_URL"));

  it("when UnauthorizedError then status is 401", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/errors/unauthorized");

    const actual = await fetch(url);

    expect(actual.status).toEqual(401);
  });

  it("when ValidationError then status is 400", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/errors/validation");

    const actual = await fetch(url);

    expect(actual.status).toEqual(400);
  });

  it("when RuntypesValidationError then status is 400", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/errors/validation/runtypes");

    const actual = await fetch(url);

    expect(actual.status).toEqual(400);
  });

  it("when unknown then status is 500", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/errors/unknown");

    const actual = await fetch(url);

    expect(actual.status).toEqual(500);
  });
});
