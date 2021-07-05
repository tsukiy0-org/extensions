import {
  Guid,
  UnauthorizedError,
  ValidationError,
} from "@tsukiy0/extensions-core";
import {
  ErrorMiddleware,
  LoggerMiddleware,
  promisifyHandler,
} from "@tsukiy0/extensions-express";
import express, { Application } from "express";

export class App {
  static build = (): Application => {
    const app = express();

    const loggerMiddleware = new LoggerMiddleware(
      "@tsukiy0/extensions-express-example",
    );

    app.use(loggerMiddleware.handler);

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

    app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

    app.use(new ErrorMiddleware(loggerMiddleware).handler);

    return app;
  };
}
