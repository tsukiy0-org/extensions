import {
  GuidExtensions,
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import fetch from "cross-fetch";

describe("ExpressJsonRuntime", () => {
  const configuration = new SystemConfiguration();
  const apiUrl = Url.check(configuration.get("API_URL"));

  describe("processor services", () => {
    it("resolves services", async () => {
      const url = UrlExtensions.appendPath(apiUrl, "/services");

      const actual = await fetch(url);

      expect(await actual.json()).toEqual({
        testService: "test",
        correlationService: expect.any(Object),
      });
    });
  });

  describe("json", () => {
    it("parses json request and formats json response", async () => {
      const url = UrlExtensions.appendPath(apiUrl, "/json");
      const body = {
        test: GuidExtensions.generate(),
      }

      const actual = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
      });

      expect(await actual.json()).toEqual(body);
    });
  });

  describe("handles errors", () => {
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
      const url = UrlExtensions.appendPath(
        apiUrl,
        "/errors/validation/runtypes",
      );

      const actual = await fetch(url);

      expect(actual.status).toEqual(400);
    });

    it("when unknown then status is 500", async () => {
      const url = UrlExtensions.appendPath(apiUrl, "/errors/unknown");

      const actual = await fetch(url);

      expect(actual.status).toEqual(500);
    });
  });

  describe("correlation", () => {
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
});
