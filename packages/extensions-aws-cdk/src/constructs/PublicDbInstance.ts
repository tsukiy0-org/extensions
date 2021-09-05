import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/lib/aws-ec2";
import {
  DatabaseInstance,
  StorageType,
  DatabaseInstanceProps,
  IDatabaseInstance,
} from "aws-cdk-lib/lib/aws-rds";
import { Construct } from "constructs";

export class PublicDbInstance extends Construct {
  public readonly instance: IDatabaseInstance;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      databaseInstance: Omit<
        DatabaseInstanceProps,
        "vpc" | "vpcSubnets" | "securityGroups"
      > &
        Required<
          Pick<DatabaseInstanceProps, "engine" | "credentials" | "port">
        >;
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

    const securityGroup = new SecurityGroup(this, "SecurityGroup", {
      allowAllOutbound: true,
      vpc,
    });

    securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(props.databaseInstance.port),
    );
    securityGroup.addIngressRule(
      Peer.anyIpv6(),
      Port.tcp(props.databaseInstance.port),
    );

    const instance = new DatabaseInstance(this, "Instance", {
      vpc,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      securityGroups: [securityGroup],
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE3,
        InstanceSize.MICRO,
      ),
      storageType: StorageType.GP2,
      allocatedStorage: 10,
      iamAuthentication: true,
      ...props.databaseInstance,
    });

    this.instance = instance;
  }
}
