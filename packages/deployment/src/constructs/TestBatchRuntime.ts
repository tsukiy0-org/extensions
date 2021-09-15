import { FargateBatchJob } from "@tsukiy0/extensions-aws-cdk";
import { SubnetType, Vpc } from "aws-cdk-lib/lib/aws-ec2";
import { DockerImageAsset } from "aws-cdk-lib/lib/aws-ecr-assets";
import { Construct } from "constructs";
import path from "path";
import { External } from "./External";

export class TestBatchRuntime extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      external: External;
    },
  ) {
    super(scope, id);

    const vpc = new Vpc(this, "Vpc", {
      cidr: Vpc.DEFAULT_CIDR_RANGE,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "public",
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });

    const dockerImage = new DockerImageAsset(this, "Image", {
      directory: path.resolve(__dirname, "../../../extensions-aws-example"),
      file: "TestBatchRuntime.Dockerfile",
    });

    const batchJob = new FargateBatchJob(this, "BatchJob", {
      vpc,
      dockerImage,
      computeResources: {
        maxvCpus: 1,
      },
      jobDefinition: {
        resourceRequirements: {
          mem: 1024,
          vcpu: 0.5,
        },
        environment: [
          {
            name: "TEST_TABLE_NAME",
            value: props.external.testTable.tableName,
          },
        ],
      },
    });
    props.external.testTable.grantReadWriteData(batchJob.role);
  }
}
