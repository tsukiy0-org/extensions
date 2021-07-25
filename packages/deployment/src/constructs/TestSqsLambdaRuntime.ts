import { DefaultFunction, LambdaQueue } from "@tsukiy0/extensions-aws-cdk";
import { Duration } from "aws-cdk-lib";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/lib/aws-lambda";
import { IQueue } from "aws-cdk-lib/lib/aws-sqs";
import { Construct } from "constructs";
import path from "path";

export class TestSqsLambdaRuntime extends Construct {
  public readonly queue: IQueue;
  public readonly fn: LambdaFunction;

  public constructor(scope: Construct, id: string) {
    super(scope, id);

    const timeout = Duration.minutes(5);
    const fn = new DefaultFunction(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(
        path.resolve(
          __dirname,
          "../../../extensions-aws-example/dist/TestSqsLambdaRuntime",
        ),
      ),
      handler: "index.handler",
      timeout,
      environment: {},
    });

    const lambdaQueue = new LambdaQueue(this, "LambdaQueue", {
      fn,
      timeout,
      maxAttempts: 1,
    });

    this.queue = lambdaQueue.queue;
    this.fn = fn;
  }
}
