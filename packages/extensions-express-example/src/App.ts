import { SystemConfiguration } from "@tsukiy0/extensions-core";
import { ErrorMiddleware, LoggerMiddleware } from "@tsukiy0/extensions-express";
import express, { Application } from "express";
import { PublicRouter } from "./routers/PublicRouter";

export class App {
  static build = (): Application => {
    const app = express();
    const configuration = new SystemConfiguration();

    const loggerMiddleware = new LoggerMiddleware(
      "@tsukiy0/extensions-express-example",
    );

    app.use(loggerMiddleware.handler);

    app.use("/v1/public", new PublicRouter(configuration).build());

    app.get("/health", (req, res) => {
      res.status(200).send("OK");
    });

    app.use(new ErrorMiddleware(loggerMiddleware).handler);

    return app;
  };
}
