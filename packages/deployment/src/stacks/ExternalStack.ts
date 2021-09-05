import { RemovalPolicy, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import {
  Credentials,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from "aws-cdk-lib/lib/aws-rds";
import { Construct } from "constructs";
import { PublicDbInstance } from "packages/extensions-aws-cdk/src/constructs/PublicDbInstance";

export class ExternalStack extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new PublicDbInstance(this, "PublicDbInstance", {
      databaseInstance: {
        engine: DatabaseInstanceEngine.postgres({
          version: PostgresEngineVersion.VER_13_3,
        }),
        credentials: Credentials.fromPassword(
          "postgres",
          SecretValue.plainText("postgres"),
        ),
        allocatedStorage: 10,

        // delete cleanly
        removalPolicy: RemovalPolicy.DESTROY,
        deletionProtection: false,
        deleteAutomatedBackups: true,
      },
    });
  }
}
