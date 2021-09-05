import { FunctionObservability } from "@tsukiy0/extensions-aws-cdk";
import { Construct } from "constructs";
import { Api } from "./Api";

export class Observability extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      api: Api;
    },
  ) {
    super(scope, id);

    const apiFnObs = new FunctionObservability(this, "ApiFnObservability", {
      fn: props.api.fn,
    });
  }
}
