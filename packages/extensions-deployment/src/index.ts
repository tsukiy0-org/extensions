import * as cdk from "@aws-cdk/core";
import { App } from "./stacks/App";
import { Static } from "./stacks/Static";
import { SystemConfiguration } from "@tsukiy0/extensions-core";

const app = new cdk.App();

const configuration = new SystemConfiguration();
const environment = configuration.get("ENVIRONMENT");

new Static(app, "Static", {
  env: {
    account: configuration.get("CDK_DEFAULT_ACCOUNT"),
    region: "us-east-1",
  },
});

new App(app, "AppUsEast1", {
  env: {
    account: configuration.get("CDK_DEFAULT_ACCOUNT"),
    region: "us-east-1",
  },
});
