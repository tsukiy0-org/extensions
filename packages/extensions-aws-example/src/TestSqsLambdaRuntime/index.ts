import "source-map-support/register";
import { SqsLambdaRuntime } from "@tsukiy0/extensions-aws";
import { Guid } from "@tsukiy0/extensions-core";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

class TestSqsLambdaRuntime extends SqsLambdaRuntime<Guid> {
  protected handle = async (message: Guid): Promise<void> => {
    const logger = new WinstonLogger(
      "TestSqsLambdaRuntime",
      this.correlationService,
    );

    logger.info(message);
  };
}

export const handler = new TestSqsLambdaRuntime().handler;
