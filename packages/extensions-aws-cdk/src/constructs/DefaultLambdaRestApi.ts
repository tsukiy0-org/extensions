import {
  Cors,
  DomainName,
  LambdaRestApi,
  MethodLoggingLevel,
} from "aws-cdk-lib/lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/lib/aws-lambda";
import { Construct } from "constructs";

export class DefaultLambdaRestApi extends LambdaRestApi {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      fn: IFunction;
      domainName?: DomainName;
    },
  ) {
    super(scope, id, {
      handler: props.fn,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      deployOptions: {
        loggingLevel: MethodLoggingLevel.ERROR,
      },
    });

    props.domainName?.addBasePathMapping(this);
  }
}
