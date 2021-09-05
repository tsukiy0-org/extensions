import { GraphWidget, IWidget } from "aws-cdk-lib/lib/aws-cloudwatch";
import { Function as LambdaFunction } from "aws-cdk-lib/lib/aws-lambda";
import { CfnQueryDefinition } from "aws-cdk-lib/lib/aws-logs";
import { Construct } from "constructs";

export class FunctionObservability extends Construct {
  public readonly invocationAndErrorWidget: IWidget;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      fn: LambdaFunction;
    },
  ) {
    super(scope, id);

    new CfnQueryDefinition(this, "LatestQuery", {
      name: this.name(props.fn, "Latest"),
      logGroupNames: [props.fn.logGroup.logGroupName],
      queryString: `
fields @timestamp, @message, @logStream
| sort @timestamp desc
| filter level >= 0
| limit 100
      `,
    });

    new CfnQueryDefinition(this, "ErrorsQuery", {
      name: this.name(props.fn, "Errors"),
      logGroupNames: [props.fn.logGroup.logGroupName],
      queryString: `
fields @timestamp, @message, @logStream
| sort @timestamp desc
| filter level >= 50
| limit 100
      `,
    });

    const invocationAndErrorWidget = new GraphWidget({
      title: this.name(props.fn, "Invocation & Errors"),
      stacked: true,
    });
    invocationAndErrorWidget.addLeftMetric(props.fn.metricInvocations());
    invocationAndErrorWidget.addRightMetric(props.fn.metricErrors());

    // new LogMetric(this, "ErrorMetric", {
    //   metricNamespace: props.fn.functionName,
    //   metricName: this.name(props.fn, "Error"),
    //   filterPattern: FilterPattern.numberValue("$.level", ">=", 50),
    //   logGroup: props.fn.logGroup,
    //   metricProps: {
    //     period: Duration.minutes(5),
    //     statistic: "sum",
    //   },
    // });

    this.invocationAndErrorWidget = invocationAndErrorWidget;
  }

  private name = (fn: LambdaFunction, suffix: string): string => {
    return `${fn.functionName} (${suffix})`;
  };
}
