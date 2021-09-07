import {
  Alarm,
  AlarmProps,
  Metric,
  MetricProps,
} from "aws-cdk-lib/lib/aws-cloudwatch";
import {
  CfnMetricFilter,
  IFilterPattern,
  ILogGroup,
} from "aws-cdk-lib/lib/aws-logs";
import { Construct } from "constructs";

export class LogMetricAlarm extends Construct {
  public readonly alarm: Alarm;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      metricProps: MetricProps;
      alarmProps: Pick<AlarmProps, "threshold">;
      filterPattern: IFilterPattern;
      logGroup: ILogGroup;
    },
  ) {
    super(scope, id);

    new CfnMetricFilter(this, "MetricFilter", {
      logGroupName: props.logGroup.logGroupName,
      filterPattern: props.filterPattern.logPatternString,
      metricTransformations: [
        {
          metricNamespace: props.metricProps.namespace,
          metricName: props.metricProps.metricName,
          metricValue: "1",
        },
      ],
    });

    const metric = new Metric(props.metricProps);

    const alarm = metric.createAlarm(this, "Alarm", {
      ...props.alarmProps,
      evaluationPeriods: 1,
    });

    this.alarm = alarm;
  }
}
