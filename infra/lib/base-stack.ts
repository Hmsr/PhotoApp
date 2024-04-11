import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ses from "aws-cdk-lib/aws-ses";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as targets from "aws-cdk-lib/aws-route53-targets";
// import { CdkStack } from "../../BeatButlerAPI/lib/cdk-stack";
import { Construct } from "constructs";

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName: string = "photos.hamish.ninja";

    const ninjaZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "hamish.ninja",
    });

    const photoBucket = new s3.Bucket(this, "photoBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: false,
    });
  }
}
