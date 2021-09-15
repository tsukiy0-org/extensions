import { Number, Record, Static, String } from "runtypes";

export const HttpProxyResponse = Record({
  statusCode: Number,
  body: String,
});

export type HttpProxyResponse = Static<typeof HttpProxyResponse>;
