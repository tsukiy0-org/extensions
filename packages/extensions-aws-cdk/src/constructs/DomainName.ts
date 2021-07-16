import {
  Certificate,
  CertificateValidation,
  ICertificate,
} from "aws-cdk-lib/lib/aws-certificatemanager";
import {
  ARecord,
  IHostedZone,
  RecordTarget,
} from "aws-cdk-lib/lib/aws-route53";
import {
  DomainName as ApiGatewayDomainName,
  EndpointType,
} from "aws-cdk-lib/lib/aws-apigateway";
import { Construct } from "constructs";

export class DomainName extends Construct {
  public readonly domainName: string;
  public readonly certificate: ICertificate;

  public constructor(
    scope: Construct,
    id: string,
    private readonly props: {
      hostedZone: IHostedZone;
      domainName: string;
    },
  ) {
    super(scope, id);

    const certificate = new Certificate(this, "Certificate", {
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(props.hostedZone),
    });

    this.domainName = props.domainName;
    this.certificate = certificate;
  }

  addARecord = (target: RecordTarget): void => {
    new ARecord(this, "AliasRecord", {
      zone: this.props.hostedZone,
      recordName: this.domainName,
      target: target,
    });
  };

  toApiGatewayDomainName = (
    scope: Construct,
    id: string,
  ): ApiGatewayDomainName => {
    return new ApiGatewayDomainName(scope, id, {
      domainName: this.domainName,
      certificate: this.certificate,
      endpointType: EndpointType.EDGE,
    });
  };
}
