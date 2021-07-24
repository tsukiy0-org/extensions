import { Timespan, TimespanExtensions } from "@tsukiy0/extensions-core";
import express, { RequestHandler } from "express";
import micromatch from "micromatch";

export class FileMiddleware {
  constructor(
    private readonly path: string,
    private readonly cacheRules: {
      glob: string;
      maxAge: Timespan;
    }[],
  ) {}

  handler: RequestHandler = express.static(this.path, {
    etag: false,
    lastModified: false,
    redirect: false,
    setHeaders: (res, p) => {
      for (const rule of this.cacheRules) {
        if (micromatch.isMatch(p, rule.glob)) {
          const seconds = TimespanExtensions.toSeconds(rule.maxAge);
          res.set("Cache-Control", `max-age=${seconds}`);
        }
      }
    },
  });
}
