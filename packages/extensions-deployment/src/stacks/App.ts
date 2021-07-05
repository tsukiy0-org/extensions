import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { Api } from "../constructs/Api";

export class App extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new Api(this, "Api");
  }
}
