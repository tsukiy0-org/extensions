import {
  CloudFormationInit,
  InitPackage,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/lib/aws-ec2";
import { Construct } from "constructs";

export class ToyPgDb extends Construct {
  public constructor(
    scope: Construct,
    id: string,
    props: {
      keyName?: string;
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

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(5432));
    securityGroup.addIngressRule(Peer.anyIpv6(), Port.tcp(5432));
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.allTraffic());

    const i = new Instance(this, "Instance", {
      vpc,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      machineImage: MachineImage.latestAmazonLinux(),
      keyName: props.keyName,
      // init: CloudFormationInit.fromElements(InitPackage.apt("")),
    });
  }
}
