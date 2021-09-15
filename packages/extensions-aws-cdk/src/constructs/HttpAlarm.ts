import { Alarm } from "aws-cdk-lib/lib/aws-cloudwatch";
import { IVpc } from "aws-cdk-lib/lib/aws-ec2";
import { Code, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { Construct } from "constructs";
import { DefaultFunction } from "./DefaultFunction";
import path from "path";
import { Rule, Schedule } from "aws-cdk-lib/lib/aws-events";
import { Duration } from "aws-cdk-lib";
import { LambdaFunction } from "aws-cdk-lib/lib/aws-events-targets";

export class HttpAlarm extends Construct {
  public readonly alarm: Alarm;

  constructor(
    scope: Construct,
    id: string,
    props: {
      url: string;
    },
  ) {
    super(scope, id);

    const fn = new DefaultFunction(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(path.resolve(__dirname, "../../lambda/HttpAlarm")),
      handler: "index.handler",
      memorySize: 128,
      timeout: Duration.seconds(20),
      environment: {
        URL: props.url,
      },
    });

    const rule = new Rule(this, "Rule", {
      schedule: Schedule.rate(Duration.minutes(1)),
    });
    rule.addTarget(new LambdaFunction(fn));

    const alarm = fn.metricErrors().createAlarm(this, "Alarm", {
      evaluationPeriods: 1,
      threshold: 1,
    });

    this.alarm = alarm;
  }
}
