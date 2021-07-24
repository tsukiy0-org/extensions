import { Timespan, TimespanExtensions } from "@tsukiy0/extensions-core";
import express, { RequestHandler } from "express";
import micromatch from "micromatch";
import { relative } from "path";

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
        const relP = relative(this.path, p);
        const isMatch = micromatch.isMatch(relP, rule.glob);
        if (isMatch) {
          const seconds = TimespanExtensions.toSeconds(rule.maxAge);
          res.set("Cache-Control", `max-age=${seconds}`);
          return;
        }
      }
    },
  });
}
