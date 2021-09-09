import { Alarm } from "aws-cdk-lib/lib/aws-cloudwatch";
import { Construct } from "constructs";
import { DefaultQueue } from "./DefaultQueue";

export class DefaultQueueAlarm extends Construct {
  public readonly alarms: Alarm[];

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

    const alarms = [
      ...(props.thresholds.maxDeadLetterCount
        ? [
            props.queue.deadLetterQueue
              .metricApproximateNumberOfMessagesVisible()
              .createAlarm(this, "MaxDeadLetterCount", {
                evaluationPeriods: 1,
                threshold: props.thresholds.maxDeadLetterCount,
              }),
          ]
        : []),
      ...(props.thresholds.maxMessageAgeInSeconds
        ? [
            props.queue.queue
              .metricApproximateAgeOfOldestMessage()
              .createAlarm(this, "MaxMessageAgeInSeconds", {
                evaluationPeriods: 1,
                threshold: props.thresholds.maxMessageAgeInSeconds,
              }),
          ]
        : []),
    ];

    this.alarms = alarms;
  }
}
