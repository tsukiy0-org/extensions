import {
  AmazonLinuxGeneration,
  CloudFormationInit,
  InitCommand,
  InitFile,
  InitPackage,
  InitService,
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
      securityGroup,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      machineImage: MachineImage.latestAmazonLinux({
        generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: props.keyName,
      init: CloudFormationInit.fromElements(
        InitFile.fromString(
          "/etc/yum.repos.d/pgdg.repo",
          `[pgdg13]
name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
baseurl=https://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0`,
        ),
        InitCommand.shellCommand(`sudo yum update -y`),
        InitPackage.yum("postgresql13"),
        InitPackage.yum("postgresql13-server"),
        InitCommand.shellCommand(
          `sudo /usr/pgsql-13/bin/postgresql-13-setup initdb`,
        ),
        InitCommand.shellCommand(`sudo systemctl start postgresql-13`),
        InitCommand.shellCommand(`sudo systemctl enable postgresql-13`),
      ),
    });
  }
}
