import { ErrorMiddleware, LoggerMiddleware } from "@tsukiy0/extensions-express";
import express, { Application } from "express";

export class App {
  static build = (): Application => {
    const app = express();

    const loggerMiddleware = new LoggerMiddleware(
      "@tsukiy0/extensions-express-example",
    );

    app.use(loggerMiddleware.handler);

    app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

    app.use(new ErrorMiddleware(loggerMiddleware).handler);

    return app;
  };
}
