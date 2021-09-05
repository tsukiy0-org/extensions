import {
  DeadLetterQueue,
  IQueue,
  Queue,
  QueueProps,
} from "aws-cdk-lib/lib/aws-sqs";
import { Construct } from "constructs";

export class DefaultQueue extends Construct {
  public readonly queue: IQueue;
  public readonly deadLetterQueue: IQueue;

  constructor(
    scope: Construct,
    id: string,
    props: Omit<QueueProps, "deadLetterQueue"> & {
      deadLetterQueue: Omit<DeadLetterQueue, "queue">;
    },
  ) {
    super(scope, id);

    const deadLetterQueue = new Queue(this, "DeadLetterQueue");

    const queue = new Queue(this, "Queue", {
      ...props,
      deadLetterQueue: {
        queue: deadLetterQueue,
        ...props.deadLetterQueue,
      },
    });

    this.queue = queue;
    this.deadLetterQueue = deadLetterQueue;
  }
}
