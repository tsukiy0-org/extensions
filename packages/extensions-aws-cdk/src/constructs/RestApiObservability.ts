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
          abs: number;
          rel: number;
        };
      };
    },
  ) {
    super(scope, id);

    if (props.alarms["5xx"].abs) {
      props.api
        .metricIntegrationLatency({
          statistic: "sum",
        })
        .createAlarm(this, "AbsoluteServerErrors", {
          evaluationPeriods: 1,
          threshold: props.alarms["5xx"].abs,
        });
    }

    if (props.alarms["5xx"].rel) {
      props.api
        .metricIntegrationLatency({
          statistic: "avg",
        })
        .createAlarm(this, "AbsoluteServerErrors", {
          evaluationPeriods: 1,
          threshold: props.alarms["5xx"].rel,
        });
    }
  }
}
