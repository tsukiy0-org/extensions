import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class ExternalStack extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // new PublicDbInstance(this, "PublicDbInstance", {
    //   databaseInstance: {
    //     engine: DatabaseInstanceEngine.postgres({
    //       version: PostgresEngineVersion.VER_13_3,
    //     }),
    //     credentials: Credentials.fromPassword(
    //       "postgres",
    //       SecretValue.plainText("postgres"),
    //     ),
    //     port: 5432,

    //     // delete cleanly
    //     removalPolicy: RemovalPolicy.DESTROY,
    //     deletionProtection: false,
    //     deleteAutomatedBackups: true,
    //   },
    // });
  }
}
