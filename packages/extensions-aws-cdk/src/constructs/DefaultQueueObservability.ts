import { Construct } from "constructs";
import { DefaultQueue } from "./DefaultQueue";

export class DefaultQueueObservability extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      defaultQueue: DefaultQueue;
      thresholds: {
        maxMessageAgeInSeconds: number;
        maxDeadLetterCount: number;
      };
    },
  ) {
    super(scope, id);

    props.defaultQueue.deadLetterQueue
      .metricApproximateNumberOfMessagesVisible()
      .createAlarm(this, "MaxDeadLetterCount", {
        evaluationPeriods: 1,
        threshold: props.thresholds.maxDeadLetterCount,
      });

    props.defaultQueue.deadLetterQueue
      .metricApproximateAgeOfOldestMessage()
      .createAlarm(this, "MaxMessageAgeInSeconds", {
        evaluationPeriods: 1,
        threshold: props.thresholds.maxMessageAgeInSeconds,
      });
  }
}
