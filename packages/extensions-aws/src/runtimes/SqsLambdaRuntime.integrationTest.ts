import {
  Guid,
  GuidExtensions,
  ICorrelationService,
  IQueue,
  StaticCorrelationService,
  SystemConfiguration,
  Url,
  TimespanExtensions,
  PromiseExtensions,
  Message,
  TimestampExtensions,
} from "@tsukiy0/extensions-core";
import { DynamoDB, SQS } from "aws-sdk";
import { SqsQueue } from "../services/SqsQueue";

describe("SqsLambdaRuntime", () => {
  let correlationService: ICorrelationService;
  let queue: IQueue<Guid>;
  let dynamo: DynamoDB.DocumentClient;
  let tableName: string;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const queueUrl = Url.check(config.get("TEST_SQS_LAMBDA_RUNTIME_QUEUE_URL"));
    tableName = config.get("TEST_SQS_LAMBDA_RUNTIME_TABLE_NAME");
    correlationService = new StaticCorrelationService();
    queue = new SqsQueue(new SQS(), queueUrl);
    dynamo = new DynamoDB.DocumentClient();
  });

  it("processes message", async () => {
    const message: Message<Guid> = {
      header: {
        version: 1,
        traceId: correlationService.getTraceId(),
        created: TimestampExtensions.now(),
      },
      body: GuidExtensions.generate(),
    };
    await queue.send(message);
    await PromiseExtensions.sleep(TimespanExtensions.seconds(20));

    const actual = await dynamo
      .get({
        TableName: tableName,
        Key: {
          PK: message,
          SK: "TEST_SQS_LAMBDA_RUNTIME",
        },
      })
      .promise();

    expect(actual.Item?.CONTENT).toEqual({
      message,
      traceId: correlationService.getTraceId(),
    });
  });
});
