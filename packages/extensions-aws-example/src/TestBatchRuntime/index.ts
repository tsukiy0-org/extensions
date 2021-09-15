import "source-map-support/register";
import { BatchRuntime } from "@tsukiy0/extensions-aws";
import { Processor } from "./Processor";

void new BatchRuntime("TestSqsLambdaRuntime", new Processor()).run();
