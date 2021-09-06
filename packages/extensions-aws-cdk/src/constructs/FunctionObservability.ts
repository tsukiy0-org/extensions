import { Function as LambdaFunction } from "aws-cdk-lib/lib/aws-lambda";
import { CfnQueryDefinition } from "aws-cdk-lib/lib/aws-logs";
import { Construct } from "constructs";

export class FunctionObservability extends Construct {
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
  }

  private name = (fn: LambdaFunction, suffix: string): string => {
    return `${fn.functionName} (${suffix})`;
  };
}
