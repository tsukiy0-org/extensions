import { RemovalPolicy } from "aws-cdk-lib";
import {
  BehaviorOptions,
  CachePolicy,
  Distribution,
  ICachePolicy,
  IDistribution,
  OriginProtocolPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/lib/aws-cloudfront-origins";
import { Bucket, IBucket } from "aws-cdk-lib/lib/aws-s3";
import { BucketDeployment, ISource } from "aws-cdk-lib/lib/aws-s3-deployment";
import { Construct } from "constructs";
import { DefaultBucket } from "./DefaultBucket";
import { DomainName } from "./DomainName";

export class StaticSite extends Construct {
  public readonly bucket: IBucket;
  public readonly cdn: IDistribution;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      source: ISource;
      behaviors: { path: string; cachePolicy: ICachePolicy }[];
      domainName?: DomainName;
    },
  ) {
    super(scope, id);

    const bucket = new DefaultBucket(this, "Bucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404.html",
      publicReadAccess: true,
    });

    new BucketDeployment(this, "BucketDeployment", {
      destinationBucket: bucket,
      sources: [props.source],
    });

    const origin = new HttpOrigin(bucket.bucketWebsiteDomainName, {
      protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
    });

    const behaviors = props.behaviors.reduce<Record<string, BehaviorOptions>>(
      (acc, next) => {
        return {
          ...acc,
          [next.path]: {
            origin,
            viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cachePolicy: next.cachePolicy,
          },
        };
      },
      {},
    );

    const cdn = new Distribution(this, "CloudFront", {
      certificate: props.domainName?.certificate,
      domainNames: props.domainName ? [props.domainName.domainName] : undefined,
      defaultBehavior: {
        origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
      },
      additionalBehaviors: behaviors,
    });

    this.bucket = bucket;
    this.cdn = cdn;
  }
}
