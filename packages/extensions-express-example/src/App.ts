import {
  Guid,
  TimespanExtensions,
  UnauthorizedError,
  ValidationError,
} from "@tsukiy0/extensions-core";
import {
  ApiKeyAuthMiddleware,
  ExpressRuntime,
  FileMiddleware,
} from "@tsukiy0/extensions-express";
import express, { Application } from "express";
import path from "path";
import { Processor } from "./processors/Processor";

export class App {
  static build = (): Application => {
    const app = express();

    const fileMiddleware = new FileMiddleware(
      path.resolve(__dirname, "./static"),
      [
        {
          glob: "*.jpg",
          maxAge: TimespanExtensions.seconds(100),
        },
        {
          glob: "*.png",
          maxAge: TimespanExtensions.seconds(200),
        },
      ],
    );
    const apiKeyAuthMiddleware = new ApiKeyAuthMiddleware(async (req, res) => {
      return {
        keys: [
          {
            name: "test",
            value: "abc123",
          },
        ],
      };
    });

    app.use("/static", fileMiddleware.handler);

    app.get(
      "/errors/unauthorized",
      new ExpressRuntime(
        new Processor(async () => {
          throw new UnauthorizedError();
        }),
      ).handler,
    );

    app.get(
      "/errors/validation",
      new ExpressRuntime(
        new Processor(async () => {
          throw new ValidationError();
        }),
      ).handler,
    );

    app.get(
      "/errors/validation/runtypes",
      new ExpressRuntime(
        new Processor(async () => {
          Guid.check("abc");
        }),
      ).handler,
    );

    app.get(
      "/errors/unknown",
      new ExpressRuntime(
        new Processor(async () => {
          throw new RangeError();
        }),
      ).handler,
    );

    app.get(
      "/services",
      new ExpressRuntime(
        new Processor(async (services) => {
          return services;
        }),
      ).handler,
    );

    app.get(
      "/correlation",
      new ExpressRuntime(
        new Processor(async ({ correlationService }) => {
          return {
            traceId: correlationService.getTraceId(),
            spanId: correlationService.getSpanId(),
          };
        }),
      ).handler,
    );

    app.get(
      "/apiKeyAuth",
      apiKeyAuthMiddleware.handler,
      new ExpressRuntime(
        new Processor(async () => {
          return;
        }),
      ).handler,
    );

    app.get(
      "/health",
      new ExpressRuntime(
        new Processor(async () => {
          return;
        }),
      ).handler,
    );

    return app;
  };
}
