import { Construct, Stack, StackProps } from "@aws-cdk/core";

export class Static extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
  }
}
