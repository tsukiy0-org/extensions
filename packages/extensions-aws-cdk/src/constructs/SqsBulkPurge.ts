import { Code, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { Construct } from "constructs";
import { DefaultFunction } from "./DefaultFunction";
import path from "path";
import { IQueue } from "aws-cdk-lib/lib/aws-sqs";

export class SqsBulkPurge extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: {
      queues: IQueue[];
    },
  ) {
    super(scope, id);

    const fn = new DefaultFunction(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(
        path.resolve(__dirname, "../../lambda/SqsBulkPurge"),
      ),
      handler: "index.handler",
      environment: {
        QUEUE_URLS: JSON.stringify(props.queues.map((_) => _.queueUrl)),
      },
    });
    props.queues.forEach((_) => _.grantPurge(fn));
  }
}
