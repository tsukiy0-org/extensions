import {
  Guid,
  TimespanExtensions,
  UnauthorizedError,
  ValidationError,
} from "@tsukiy0/extensions-core";
import {
  CorrelationMiddleware,
  ErrorMiddleware,
  FileMiddleware,
  LoggerMiddleware,
  promisifyHandler,
} from "@tsukiy0/extensions-express";
import express, { Application } from "express";
import { ServicesMiddleware } from "./middlewares/ServicesMiddleware";
import path from "path";

export class App {
  static build = (): Application => {
    const app = express();

    const correlationMiddleware = new CorrelationMiddleware();
    const loggerMiddleware = new LoggerMiddleware(
      "@tsukiy0/extensions-express-example",
      correlationMiddleware,
    );
    const servicesMiddleware = new ServicesMiddleware();
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

    app.use(correlationMiddleware.handler);
    app.use(loggerMiddleware.handler);
    app.use(servicesMiddleware.handler);
    app.use("/static", fileMiddleware.handler);

    app.get(
      "/errors/unauthorized",
      promisifyHandler(async () => {
        throw new UnauthorizedError();
      }),
    );

    app.get(
      "/errors/validation",
      promisifyHandler(async () => {
        throw new ValidationError();
      }),
    );

    app.get(
      "/errors/validation/runtypes",
      promisifyHandler(async () => {
        Guid.check("abc");
      }),
    );

    app.get(
      "/errors/unknown",
      promisifyHandler(async () => {
        throw new RangeError();
      }),
    );

    app.get(
      "/services",
      promisifyHandler(async (_, res) => {
        const services = servicesMiddleware.getServices(res);
        res.status(200).json(services);
      }),
    );

    app.get(
      "/correlation",
      promisifyHandler(async (_, res) => {
        const correlationService = correlationMiddleware.getService(res);
        res.status(200).json({
          traceId: correlationService.getTraceId(),
          spanId: correlationService.getSpanId(),
        });
      }),
    );

    app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

    app.use(new ErrorMiddleware(loggerMiddleware).handler);

    return app;
  };
}
