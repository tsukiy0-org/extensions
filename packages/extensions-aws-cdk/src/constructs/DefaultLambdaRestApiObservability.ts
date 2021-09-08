import { RestApi } from "aws-cdk-lib/lib/aws-apigateway";
import { Construct } from "constructs";

export class RestApiObservability extends Construct {
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
    },
  ) {
    super(scope, id);

    if (props.thresholds.max5xxErrors) {
      props.api
        .metricServerError({
          statistic: "sum",
        })
        .createAlarm(this, "Max5xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.max5xxErrors,
        });
    }

    if (props.thresholds.max4xxErrors) {
      props.api
        .metricClientError({
          statistic: "sum",
        })
        .createAlarm(this, "Max4xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.max4xxErrors,
        });
    }

    if (props.thresholds.maxPercentageOf5xxErrors) {
      props.api
        .metricServerError({
          statistic: "avg",
        })
        .createAlarm(this, "MaxPercentageOf5xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxPercentageOf5xxErrors,
        });
    }

    if (props.thresholds.maxPercentageOf4xxErrors) {
      props.api
        .metricServerError({
          statistic: "avg",
        })
        .createAlarm(this, "MaxPercentageOf4xxErrors", {
          evaluationPeriods: 1,
          threshold: props.thresholds.maxPercentageOf4xxErrors,
        });
    }
  }
}
