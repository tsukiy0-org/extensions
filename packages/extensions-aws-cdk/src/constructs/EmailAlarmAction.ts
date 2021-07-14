import { IAlarmAction } from "aws-cdk-lib/lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/lib/aws-cloudwatch-actions";
import { Topic } from "aws-cdk-lib/lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/lib/aws-sns-subscriptions";
import { Construct } from "constructs";

export class EmailAlarmAction extends Construct {
  public readonly action: IAlarmAction;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      emails: string[];
    },
  ) {
    super(scope, id);

    const topic = new Topic(scope, "Topic", {});
    props.emails.forEach((email) =>
      topic.addSubscription(new EmailSubscription(email)),
    );

    const action = new SnsAction(topic);

    this.action = action;
  }
}
