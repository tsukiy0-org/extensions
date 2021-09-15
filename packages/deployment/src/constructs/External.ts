import { ITable, Table } from "aws-cdk-lib/lib/aws-dynamodb";
import { Construct } from "constructs";

export class External extends Construct {
  public readonly testTable: ITable;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      testTableName: string;
    },
  ) {
    super(scope, id);

    const testTable = Table.fromTableName(
      this,
      "TestTable",
      props.testTableName,
    );

    this.testTable = testTable;
  }
}
