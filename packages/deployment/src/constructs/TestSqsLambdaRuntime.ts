import {
  DefaultFunction,
  FunctionQueue,
  SqsBulkPurge,
} from "@tsukiy0/extensions-aws-cdk";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  Table,
} from "aws-cdk-lib/lib/aws-dynamodb";
import { Code, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { IQueue } from "aws-cdk-lib/lib/aws-sqs";
import { Construct } from "constructs";
import path from "path";
import { External } from "./External";

export class TestSqsLambdaRuntime extends Construct {
  public readonly queue: IQueue;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      external: External;
    },
  ) {
    super(scope, id);

    // @TODO remove this
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
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const timeout = Duration.seconds(20);
    const fn = new DefaultFunction(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(
        path.resolve(
          __dirname,
          "../../../extensions-aws-example/dist/TestSqsLambdaRuntime",
        ),
      ),
      memorySize: 256,
      handler: "index.handler",
      timeout,
      environment: {
        TEST_TABLE_NAME: props.external.testTable.tableName,
      },
    });
    props.external.testTable.grantReadWriteData(fn);

    const lambdaQueue = new FunctionQueue(this, "LambdaQueue", {
      fn,
      timeout,
      maxAttempts: 1,
    });

    new SqsBulkPurge(this, "DeadLetterQueuePurge", {
      queues: [lambdaQueue.queue.deadLetterQueue],
    });

    this.queue = lambdaQueue.queue.queue;
  }
}
