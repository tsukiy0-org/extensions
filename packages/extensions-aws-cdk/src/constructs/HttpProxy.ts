import { Code, IFunction, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { Construct } from "constructs";
import { DefaultFunction } from "./DefaultFunction";
import path from "path";
import { Duration } from "aws-cdk-lib";

export class HttpProxy extends Construct {
  public readonly fn: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    new DefaultFunction(this, "Fn", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(path.resolve(__dirname, "../../lambda/HttpProxy")),
      handler: "index.handler",
      memorySize: 128,
      timeout: Duration.seconds(30),
    });

    this.fn = fn;
  }
}
