import {
  DefaultProcessor,
  Guid,
  ProcessorServices,
  SystemConfiguration,
} from "@tsukiy0/extensions-core";
import { DynamoDB } from "aws-sdk";

export class Processor extends DefaultProcessor<Guid, void> {
  protected handle = async (
    body: Guid,
    services: ProcessorServices,
  ): Promise<void> => {
    const config = new SystemConfiguration();

    const tableName = config.get("TABLE_NAME");
    const client = new DynamoDB.DocumentClient();

    await client
      .put({
        TableName: tableName,
        Item: {
          PK: body,
          SK: "TEST_SQS_LAMBDA_RUNTIME",
          CONTENT: {
            message: body,
            traceId: services.correlationService.getTraceId(),
          },
        },
      })
      .promise();
  };
}
