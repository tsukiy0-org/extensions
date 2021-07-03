import { Record, Static, String, Unknown } from "runtypes";
import { Log } from "./Log";

export const ErrorLog = Log.extend({
  exception: Record({
    type: String,
    message: String,
    stackTrace: String,
    context: Unknown,
  }),
});

export type ErrorLog = Static<typeof ErrorLog>;
