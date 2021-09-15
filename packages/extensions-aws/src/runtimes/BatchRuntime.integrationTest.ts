import {
  Guid,
  GuidExtensions,
  ICorrelationService,
  IQueue,
  StaticCorrelationService,
  SystemConfiguration,
  TimespanExtensions,
  PromiseExtensions,
  DefaultQueue,
  TimestampExtensions,
} from "@tsukiy0/extensions-core";
import { DynamoDB } from "aws-sdk";
import { BatchMessageQueue } from "../services/BatchMessageQueue";

class TestQueue extends DefaultQueue<Guid> {}

describe("BatchRuntime", () => {
  let correlationService: ICorrelationService;
  let queue: IQueue<Guid>;
  let dynamo: DynamoDB.DocumentClient;
  const now = TimestampExtensions.now();
  let tableName: string;

  beforeEach(() => {
    const config = new SystemConfiguration();
    tableName = config.get("TEST_TABLE_NAME");
    correlationService = new StaticCorrelationService();
    queue = new TestQueue(
      BatchMessageQueue.build({
        jobQueue: config.get("TEST_BATCH_RUNTIME_JOB_QUEUE"),
        jobDefinition: config.get("TEST_BATCH_RUNTIME_JOB_DEFINITION"),
      }),
      correlationService,
      {
        now: () => now,
      },
    );
    dynamo = new DynamoDB.DocumentClient();
  });

  it("processes message", async () => {
    const body = GuidExtensions.generate();
    await queue.send(body);
    await PromiseExtensions.sleep(TimespanExtensions.seconds(120));

    const actual = await dynamo
      .get({
        TableName: tableName,
        Key: {
          PK: body,
          SK: "TEST_BATCH_RUNTIME",
        },
      })
      .promise();

    expect(actual.Item?.CONTENT).toEqual({
      message: body,
      traceId: correlationService.getTraceId(),
    });
  });
});
