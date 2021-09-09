import { Construct } from "constructs";
import { DefaultQueue } from "./DefaultQueue";

export class DefaultQueueAlarm extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      queue: DefaultQueue;
      thresholds: {
        maxMessageAgeInSeconds?: number;
        maxDeadLetterCount?: number;
      };
    },
  ) {
    super(scope, id);

    if (props.thresholds.maxDeadLetterCount) {
      props.queue.deadLetterQueue
        .metricApproximateNumberOfMessagesVisible()
        .createAlarm(this, "MaxDeadLetterCount", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxDeadLetterCount,
        });
    }

    if (props.thresholds.maxMessageAgeInSeconds) {
      props.queue.deadLetterQueue
        .metricApproximateAgeOfOldestMessage()
        .createAlarm(this, "MaxMessageAgeInSeconds", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxMessageAgeInSeconds,
        });
    }
  }
}
