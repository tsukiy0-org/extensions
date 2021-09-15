import { Url } from "@tsukiy0/extensions-core";
import { Record, String, Array, Static } from "runtypes";

export const HttpProxyRequestOptions = Record({
  method: String,
  url: Url,
  headers: Array(
    Record({
      key: String,
      value: String,
    }),
  ).optional(),
  body: String.optional(),
});

export type HttpProxyRequestOptions = Static<typeof HttpProxyRequestOptions>;
