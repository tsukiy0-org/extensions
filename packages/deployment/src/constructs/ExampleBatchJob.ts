import { FargateBatchJob } from "@tsukiy0/extensions-aws-cdk";
import { SubnetType, Vpc } from "aws-cdk-lib/lib/aws-ec2";
import { DockerImageAsset } from "aws-cdk-lib/lib/aws-ecr-assets";
import { Construct } from "constructs";
import path from "path";

export class ExampleBatchJob extends Construct {
  public constructor(scope: Construct, id: string) {
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
      directory: path.resolve(__dirname, "../../"),
      file: "ExampleBatchJob.Dockerfile",
    });

    new FargateBatchJob(this, "BatchJob", {
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
            name: "TEST",
            value: "test",
          },
        ],
      },
    });
  }
}
