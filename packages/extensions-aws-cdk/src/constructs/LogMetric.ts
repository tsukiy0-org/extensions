import { Metric, MetricProps } from "aws-cdk-lib/lib/aws-cloudwatch";
import {
  CfnMetricFilter,
  IFilterPattern,
  ILogGroup,
} from "aws-cdk-lib/lib/aws-logs";
import { Construct } from "constructs";

export class LogMetric extends Construct {
  public readonly metric: Metric;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      metricProps: MetricProps;
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

    this.metric = metric;
  }
}
