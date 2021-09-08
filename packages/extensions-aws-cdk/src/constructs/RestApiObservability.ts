import { RestApi } from "aws-cdk-lib/lib/aws-apigateway";
import { Construct } from "constructs";

export class RestApiObservability extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      api: RestApi;
      alarms: {
        ["5xx"]: {
          abs?: number;
          rel?: number;
        };
        ["4xx"]: {
          abs?: number;
          rel?: number;
        };
      };
    },
  ) {
    super(scope, id);

    if (props.alarms["5xx"].abs) {
      props.api
        .metricServerError({
          statistic: "sum",
        })
        .createAlarm(this, "5xxErrorsTotal", {
          evaluationPeriods: 1,
          threshold: props.alarms["5xx"].abs,
        });
    }

    if (props.alarms["5xx"].rel) {
      props.api
        .metricServerError({
          statistic: "avg",
        })
        .createAlarm(this, "5xxErrorsPercentage", {
          evaluationPeriods: 1,
          threshold: props.alarms["5xx"].rel,
        });
    }

    if (props.alarms["4xx"].abs) {
      props.api
        .metricClientError({
          statistic: "sum",
        })
        .createAlarm(this, "4xxErrorsTotal", {
          evaluationPeriods: 1,
          threshold: props.alarms["4xx"].abs,
        });
    }

    if (props.alarms["4xx"].abs) {
      props.api
        .metricClientError({
          statistic: "avg",
        })
        .createAlarm(this, "4xxErrorsPercentage", {
          evaluationPeriods: 1,
          threshold: props.alarms["4xx"].abs,
        });
    }
  }
}
