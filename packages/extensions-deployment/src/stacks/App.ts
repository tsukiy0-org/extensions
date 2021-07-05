import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import { Api } from "../constructs/Api";

export class App extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new Api(this, "Api");

    new CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
