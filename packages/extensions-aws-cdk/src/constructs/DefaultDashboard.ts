import { Dashboard } from "aws-cdk-lib/lib/aws-cloudwatch";
import { Construct } from "constructs";

export class DefaultDashboard extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Dashboard(this, "Dashboard");
  }
}
