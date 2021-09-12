import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "../constructs/Api";
import { ExampleBatchJob } from "../constructs/ExampleBatchJob";
import { TestSqsLambdaRuntime } from "../constructs/TestSqsLambdaRuntime";

export class AppStack extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new Api(this, "Api");

    const testSqsLambdaRuntime = new TestSqsLambdaRuntime(
      this,
      "TestSqsLambdaRuntime",
    );

    new ExampleBatchJob(this, "ExampleBatchJob");

    new CfnOutput(this, "ApiUrl", {
      value: api.url,
    });

    new CfnOutput(this, "TestSqsLambdaRuntimeQueueUrl", {
      value: testSqsLambdaRuntime.queue.queueUrl,
    });

    new CfnOutput(this, "TestSqsLambdaRuntimeTableName", {
      value: testSqsLambdaRuntime.table.tableName,
    });
  }
}
