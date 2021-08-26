import { DefaultProcessor } from "@tsukiy0/extensions-aws";
import { Guid, Message, SystemConfiguration } from "@tsukiy0/extensions-core";
import { DynamoDB } from "aws-sdk";

export class Processor extends DefaultProcessor<Guid, void> {
  constructor() {
    super("TestSqsLambdaRuntime");
  }

  protected handle = async (message: Message<Guid>): Promise<void> => {
    const config = new SystemConfiguration();

    const tableName = config.get("TABLE_NAME");
    const client = new DynamoDB.DocumentClient();

    await client
      .put({
        TableName: tableName,
        Item: {
          PK: message.body,
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
