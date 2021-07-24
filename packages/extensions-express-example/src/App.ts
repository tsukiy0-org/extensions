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
import { ServicesMiddleware } from "./middlewares/ServicesMiddleware";

export class App {
  static build = (): Application => {
    const app = express();

    const loggerMiddleware = new LoggerMiddleware(
      "@tsukiy0/extensions-express-example",
    );
    const servicesMiddleware = new ServicesMiddleware();

    app.use(loggerMiddleware.handler);
    app.use(servicesMiddleware.handler);

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

    app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

    app.use(new ErrorMiddleware(loggerMiddleware).handler);

    return app;
  };
}
