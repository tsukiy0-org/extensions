import { SystemConfiguration, Url } from "@tsukiy0/extensions-core";
import { Lambda } from "aws-sdk";
import { HttpProxyService } from "./HttpProxyService";

describe("HttpProxyService", () => {
  let service: HttpProxyService;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const fnName = config.get("HTTP_PROXY_FUNCTION_NAME");
    service = new HttpProxyService(new Lambda(), fnName);
  });

  describe("request", () => {
    it("response", async () => {
      const res = await service.request({
        method: "GET",
        url: Url.check("https://google.com"),
      });

      expect(res).toEqual({
        statusCode: 200,
        body: expect.any(String),
      });
    });
  });
});
