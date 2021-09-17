import { Url } from "@tsukiy0/extensions-core";
import { Record, String, Static, Dictionary } from "runtypes";

export const HttpProxyRequestOptions = Record({
  method: String,
  url: Url,
  headers: Dictionary(String, String).optional(),
  body: String.optional(),
});

export type HttpProxyRequestOptions = Static<typeof HttpProxyRequestOptions>;
