import { Construct } from "constructs";
import {
  CfnComputeEnvironment,
  CfnJobDefinition,
  CfnJobQueue,
} from "aws-cdk-lib/lib/aws-batch";
import { DockerImageAsset } from "aws-cdk-lib/lib/aws-ecr-assets";
import { IVpc, SecurityGroup } from "aws-cdk-lib/lib/aws-ec2";
import {
  Grant,
  IGrantable,
  IRole,
  ManagedPolicy,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/lib/aws-iam";

export class FargateBatchJob extends Construct {
  public readonly jobDefinition: CfnJobDefinition;
  public readonly jobQueue: CfnJobQueue;
  public readonly role: IRole;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      vpc: IVpc;
      dockerImage: DockerImageAsset;
      computeResources: Required<
        Pick<CfnComputeEnvironment.ComputeResourcesProperty, "maxvCpus">
      >;
      jobDefinition: {
        resourceRequirements: {
          mem: number;
          vcpu: number;
        };
        environment: Record<string, string>;
      };
    },
  ) {
    super(scope, id);

    const securityGroup = new SecurityGroup(this, "SecurityGroup", {
      vpc: props.vpc,
    });

    const computeEnvironment = new CfnComputeEnvironment(
      this,
      "ComputeEnvironment",
      {
        type: "MANAGED",
        computeResources: {
          type: "FARGATE",
          subnets: props.vpc.publicSubnets.map((_) => _.subnetId),
          securityGroupIds: [securityGroup.securityGroupId],
          ...props.computeResources,
        },
      },
    );

    const jobQueue = new CfnJobQueue(this, "JobQueue", {
      priority: 0,
      computeEnvironmentOrder: [
        {
          computeEnvironment: computeEnvironment.ref,
          order: 0,
        },
      ],
    });

    const role = new Role(this, "Role", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromManagedPolicyArn(
          this,
          "AmazonECSTaskExecutionRolePolicy",
          "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
        ),
      ],
    });

    const jobDefinition = new CfnJobDefinition(this, "JobDefinition", {
      jobDefinitionName: "R18IngestFileExtractJob",
      type: "container",
      containerProperties: {
        image: props.dockerImage.imageUri,
        resourceRequirements: [
          {
            type: "VCPU",
            value: props.jobDefinition.resourceRequirements.vcpu.toString(),
          },
          {
            type: "MEMORY",
            value: props.jobDefinition.resourceRequirements.mem.toString(),
          },
        ],
        executionRoleArn: role.roleArn,
        networkConfiguration: {
          assignPublicIp: "ENABLED",
        },
        environment: Object.entries(props.jobDefinition.environment).map(
          ([key, value]) => {
            return {
              key,
              value,
            };
          },
        ),
      },
      platformCapabilities: ["FARGATE"],
    });

    this.role = role;
    this.jobDefinition = jobDefinition;
    this.jobQueue = jobQueue;
  }

  public readonly grantSubmit = (grantee: IGrantable) => {
    Grant.addToPrincipal({
      grantee,
      actions: ["batch:SubmitJob"],
      resourceArns: [this.jobQueue.ref, this.jobDefinition.ref],
    });
  };
}
