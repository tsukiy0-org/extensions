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
  DefaultQueue,
  SystemClock,
  TimestampExtensions,
} from "@tsukiy0/extensions-core";
import { DynamoDB } from "aws-sdk";
import { SqsMessageQueue } from "../services/SqsMessageQueue";

class TestQueue extends DefaultQueue<Guid> {}

describe("SqsLambdaRuntime", () => {
  let correlationService: ICorrelationService;
  let queue: IQueue<Guid>;
  let dynamo: DynamoDB.DocumentClient;
  const now = TimestampExtensions.now();
  let tableName: string;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const queueUrl = Url.check(config.get("TEST_SQS_LAMBDA_RUNTIME_QUEUE_URL"));
    tableName = config.get("TEST_SQS_LAMBDA_RUNTIME_TABLE_NAME");
    correlationService = new StaticCorrelationService();
    queue = new TestQueue(SqsMessageQueue.build(queueUrl), correlationService, {
      now: () => now,
    });
    dynamo = new DynamoDB.DocumentClient();
  });

  it("processes message", async () => {
    const body = GuidExtensions.generate();
    await queue.send(body);
    await PromiseExtensions.sleep(TimespanExtensions.seconds(20));

    const actual = await dynamo
      .get({
        TableName: tableName,
        Key: {
          PK: body,
          SK: "TEST_SQS_LAMBDA_RUNTIME",
        },
      })
      .promise();

    expect(actual.Item?.CONTENT).toEqual({
      message: {
        header: {
          version: 1,
          traceId: correlationService.getTraceId(),
          created: now,
        },
        body,
      },
      traceId: correlationService.getTraceId(),
    });
  });
});
