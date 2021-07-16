import { Duration, Fn } from "aws-cdk-lib";
import { IFunction } from "aws-cdk-lib/lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/lib/aws-lambda-event-sources";
import { IQueue, Queue } from "aws-cdk-lib/lib/aws-sqs";
import { Construct } from "constructs";

export class LambdaQueue extends Construct {
  public readonly queue: IQueue;

  constructor(
    scope: Construct,
    id: string,
    props: {
      fn: IFunction;
      timeout: Duration;
      retry: number;
    },
  ) {
    super(scope, id);

    // https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
    const queue = new Queue(this, "Queue", {
      visibilityTimeout: Duration.millis(6 * props.timeout.toMilliseconds()),
      deadLetterQueue: {
        queue: new Queue(this, "DeadLetterQueue"),
        maxReceiveCount: props.retry,
      },
    });

    const source = new SqsEventSource(queue, {
      batchSize: 1,
    });

    props.fn.addEventSource(source);

    this.queue = queue;
  }
}
