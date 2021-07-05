import { Code, Runtime, Function } from "@aws-cdk/aws-lambda";
import { Construct } from "@aws-cdk/core";
import path from "path";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { HttpApi } from "@aws-cdk/aws-apigatewayv2";

export class Api extends Construct {
  public readonly url: string;

  public constructor(scope: Construct, id: string) {
    super(scope, id);

    const fn = new Function(this, "Function", {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(
        path.resolve(__dirname, "../../../extensions-express-example/dist"),
      ),
      handler: "index.handler",
      memorySize: 512,
      environment: {},
    });

    const api = new HttpApi(this, "Api", {
      defaultIntegration: new LambdaProxyIntegration({
        handler: fn,
      }),
    });

    this.url = api.apiEndpoint;
  }
}
