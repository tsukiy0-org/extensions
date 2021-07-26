import "source-map-support/register";
import { SqsLambdaRuntime } from "@tsukiy0/extensions-aws";
import { Guid, SystemConfiguration } from "@tsukiy0/extensions-core";
import { DynamoDB } from "aws-sdk";

class TestSqsLambdaRuntime extends SqsLambdaRuntime<Guid> {
  protected handle = async (message: Guid): Promise<void> => {
    const config = new SystemConfiguration();

    const tableName = config.get("TABLE_NAME");
    const client = new DynamoDB.DocumentClient();

    await client
      .put({
        TableName: tableName,
        Item: {
          PK: message,
          SK: "TEST_SQS_LAMBDA_RUNTIME",
          CONTENT: {
            message,
            traceId: this.correlationService.getTraceId(),
          },
        },
      })
      .promise();
  };
}

export const handler = new TestSqsLambdaRuntime().handler;
