import "source-map-support/register";
import { SqsLambdaRuntime } from "@tsukiy0/extensions-aws";
import { Guid } from "@tsukiy0/extensions-core";
import { Processor } from "./Processor";

class TestSqsLambdaRuntime extends SqsLambdaRuntime<Guid> {
  constructor() {
    super(new Processor("TestSqsLambdaRuntime"));
  }
}

export const handler = new TestSqsLambdaRuntime().handler;
