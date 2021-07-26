import { DefaultFunction, LambdaQueue } from "@tsukiy0/extensions-aws-cdk";
import { Duration } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ITable,
  Table,
} from "aws-cdk-lib/lib/aws-dynamodb";
import { Code, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { IQueue } from "aws-cdk-lib/lib/aws-sqs";
import { Construct } from "constructs";
import path from "path";

export class TestSqsLambdaRuntime extends Construct {
  public readonly queue: IQueue;
  public readonly table: ITable;

  public constructor(scope: Construct, id: string) {
    super(scope, id);

    const timeout = Duration.seconds(20);

    const table = new Table(this, "Table", {
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

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
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(fn);

    const lambdaQueue = new LambdaQueue(this, "LambdaQueue", {
      fn,
      timeout,
      maxAttempts: 1,
    });

    this.queue = lambdaQueue.queue;
    this.table = table;
  }
}
