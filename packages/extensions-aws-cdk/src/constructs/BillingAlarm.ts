import { Duration } from "aws-cdk-lib";
import {
  Alarm,
  ComparisonOperator,
  IAlarmAction,
  Metric,
} from "aws-cdk-lib/lib/aws-cloudwatch";
import { Construct } from "constructs";

export class BillingAlarm extends Construct {
  private readonly alarm: Alarm;

  constructor(
    scope: Construct,
    id: string,
    props: {
      amountUSD: number;
    },
  ) {
    super(scope, id);

    const metric = new Metric({
      metricName: "EstimatedCharges",
      namespace: "AWS/Billing",
      period: Duration.hours(6),
      statistic: "Maximum",
      dimensions: {
        Currency: "USD",
      },
    });

    const alarm = metric.createAlarm(scope, `Alarm`, {
      alarmName: `Billing (>= ${props.amountUSD}USD)`,
      threshold: props.amountUSD,
      evaluationPeriods: 1,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    });

    this.alarm = alarm;
  }

  addAction = (action: IAlarmAction): void => {
    this.alarm.addAlarmAction(action);
  };
}
