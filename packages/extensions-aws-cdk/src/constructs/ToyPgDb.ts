import { Duration } from "aws-cdk-lib";
import {
  AmazonLinuxGeneration,
  CloudFormationInit,
  InitCommand,
  InitFile,
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
      keyName: string;
      password: string;
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
        //         InitFile.fromString(
        //           "/etc/yum.repos.d/pgdg.repo",
        //           `[pgdg13]
        // name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
        // baseurl=https://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
        // enabled=1
        // gpgcheck=0`,
        //         ),
        InitCommand.shellCommand(
          "sudo dnf install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm",
        ),
        InitCommand.shellCommand("sudo yum update -y"),
        InitCommand.shellCommand(
          "sudo yum -y install postgresql13 postgresql13-server",
        ),
        InitCommand.shellCommand(
          "sudo /usr/pgsql-13/bin/postgresql-13-setup initdb",
        ),
        InitCommand.shellCommand("sudo su - postgres"),
        InitCommand.shellCommand(
          `psql -c "alter user postgres with password '${props.password}'"`,
        ),
        InitCommand.shellCommand(
          "echo \"listen_addresses = '*'\" >> /var/lib/pgsql/13/data/postgresql.conf",
        ),
        InitCommand.shellCommand(
          'echo "host all all 0.0.0.0/0 md5" >> /var/lib/pgsql/13/data/pg_hba.conf',
        ),
        InitCommand.shellCommand(`sudo systemctl start postgresql-13`),
        InitCommand.shellCommand(`sudo systemctl enable postgresql-13`),
      ),
      // initOptions: {
      //   timeout: Duration.minutes(30),
      // },
    });
  }
}
