import "source-map-support/register";
import serverlessExpresss from "@vendia/serverless-express";
import { APIGatewayProxyHandler } from "aws-lambda";
import { Application } from "express";

export class ExpressLambdaRuntime {
  constructor(private readonly app: Application) {}

  handler: APIGatewayProxyHandler = serverlessExpresss({
    app: this.app,
  });
}
