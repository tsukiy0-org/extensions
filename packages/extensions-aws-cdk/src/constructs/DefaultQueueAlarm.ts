import { Alarm } from "aws-cdk-lib/lib/aws-cloudwatch";
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
      onAddAlarm?: (alarm: Alarm) => void;
    },
  ) {
    super(scope, id);

    if (props.thresholds.maxDeadLetterCount) {
      const alarm = props.queue.deadLetterQueue
        .metricApproximateNumberOfMessagesVisible()
        .createAlarm(this, "MaxDeadLetterCount", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxDeadLetterCount,
        });
      props.onAddAlarm && props.onAddAlarm(alarm);
    }

    if (props.thresholds.maxMessageAgeInSeconds) {
      const alarm = props.queue.deadLetterQueue
        .metricApproximateAgeOfOldestMessage()
        .createAlarm(this, "MaxMessageAgeInSeconds", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxMessageAgeInSeconds,
        });
      props.onAddAlarm && props.onAddAlarm(alarm);
    }
  }
}
