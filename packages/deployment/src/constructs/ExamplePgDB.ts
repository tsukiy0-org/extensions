import { RemovalPolicy, SecretValue } from "aws-cdk-lib";
import {
  Credentials,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from "aws-cdk-lib/lib/aws-rds";
import { Construct } from "constructs";
import { PublicDbInstance } from "packages/extensions-aws-cdk/src/constructs/PublicDbInstance";

export class ExamplePgDb extends Construct {
  public constructor(scope: Construct, id: string) {
    super(scope, id);

    new PublicDbInstance(this, "DbInstance", {
      databaseInstance: {
        engine: DatabaseInstanceEngine.postgres({
          version: PostgresEngineVersion.VER_13_3,
        }),
        credentials: Credentials.fromPassword(
          "postgres",
          SecretValue.plainText("postgres"),
        ),
        port: 5432,

        // delete cleanly
        removalPolicy: RemovalPolicy.DESTROY,
        deletionProtection: false,
        deleteAutomatedBackups: true,
      },
    });
  }
}
