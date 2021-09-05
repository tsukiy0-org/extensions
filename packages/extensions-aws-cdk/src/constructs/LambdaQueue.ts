import { Duration } from "aws-cdk-lib";
import { IFunction } from "aws-cdk-lib/lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/lib/aws-lambda-event-sources";
import { Construct } from "constructs";
import { DefaultQueue } from "./DefaultQueue";

export class LambdaQueue extends Construct {
  public readonly queue: DefaultQueue;

  constructor(
    scope: Construct,
    id: string,
    props: {
      fn: IFunction;
      timeout: Duration;
      maxAttempts: number;
    },
  ) {
    super(scope, id);

    const queue = new DefaultQueue(this, "Queue", {
      // https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
      visibilityTimeout: Duration.millis(6 * props.timeout.toMilliseconds()),
      deadLetterQueue: {
        maxReceiveCount: props.maxAttempts,
      },
    });

    const source = new SqsEventSource(queue.queue, {
      batchSize: 1,
    });

    props.fn.addEventSource(source);

    this.queue = queue;
  }
}
