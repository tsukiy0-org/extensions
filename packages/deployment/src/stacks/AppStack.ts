import { HttpProxy, ToyPgDb } from "@tsukiy0/extensions-aws-cdk";
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "../constructs/Api";
import { External } from "../constructs/External";
import { TestBatchRuntime } from "../constructs/TestBatchRuntime";
import { TestSqsLambdaRuntime } from "../constructs/TestSqsLambdaRuntime";

export class AppStack extends Stack {
  public constructor(
    scope: Construct,
    id: string,
    props: StackProps & {
      testTableName: string;
    },
  ) {
    super(scope, id, props);

    const external = new External(this, "External", {
      testTableName: props.testTableName,
    });

    const api = new Api(this, "Api");

    const testSqsLambdaRuntime = new TestSqsLambdaRuntime(
      this,
      "TestSqsLambdaRuntime",
      { external },
    );

    const testBatchRuntime = new TestBatchRuntime(this, "TestBatchRuntime", {
      external,
    });

    const httpProxy = new HttpProxy(this, "HttpProxy");

    new ToyPgDb(this, "ToyPgDb", {
      keyName: "test",
    });

    new CfnOutput(this, "ApiUrl", {
      value: api.url,
    });

    new CfnOutput(this, "HttpProxyFunctionName", {
      value: httpProxy.fn.functionName,
    });

    new CfnOutput(this, "TestSqsLambdaRuntimeQueueUrl", {
      value: testSqsLambdaRuntime.queue.queueUrl,
    });

    new CfnOutput(this, "TestBatchRuntimeJobQueue", {
      value: testBatchRuntime.batchJob.jobQueue.ref,
    });

    new CfnOutput(this, "TestBatchRuntimeJobDefinition", {
      value: testBatchRuntime.batchJob.jobDefinition.ref,
    });

    new CfnOutput(this, "TestTableName", {
      value: external.testTable.tableName,
    });
  }
}
