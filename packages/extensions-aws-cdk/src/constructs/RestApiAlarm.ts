import { RestApi } from "aws-cdk-lib/lib/aws-apigateway";
import { Alarm } from "aws-cdk-lib/lib/aws-cloudwatch";
import { Construct } from "constructs";

export class RestApiAlarm extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      api: RestApi;
      thresholds: {
        max5xxErrors?: number;
        max4xxErrors?: number;
        maxPercentageOf5xxErrors?: number;
        maxPercentageOf4xxErrors?: number;
      };
      onAddAlarm?: (alarm: Alarm) => void;
    },
  ) {
    super(scope, id);

    if (props.thresholds.max5xxErrors) {
      const alarm = props.api
        .metricServerError({
          statistic: "sum",
        })
        .createAlarm(this, "Max5xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.max5xxErrors,
        });
      props.onAddAlarm && props.onAddAlarm(alarm);
    }

    if (props.thresholds.max4xxErrors) {
      const alarm = props.api
        .metricClientError({
          statistic: "sum",
        })
        .createAlarm(this, "Max4xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.max4xxErrors,
        });
      props.onAddAlarm && props.onAddAlarm(alarm);
    }

    if (props.thresholds.maxPercentageOf5xxErrors) {
      const alarm = props.api
        .metricServerError({
          statistic: "avg",
        })
        .createAlarm(this, "MaxPercentageOf5xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxPercentageOf5xxErrors,
        });
      props.onAddAlarm && props.onAddAlarm(alarm);
    }

    if (props.thresholds.maxPercentageOf4xxErrors) {
      const alarm = props.api
        .metricServerError({
          statistic: "avg",
        })
        .createAlarm(this, "MaxPercentageOf4xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxPercentageOf4xxErrors,
        });
      props.onAddAlarm && props.onAddAlarm(alarm);
    }
  }
}
