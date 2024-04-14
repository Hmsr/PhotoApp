import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ses from "aws-cdk-lib/aws-ses";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName: string = "photos.hamish.ninja";

    const hostedZone = new cdk.aws_route53.HostedZone(this, "HostedZone", {
      zoneName: `${domainName}`,
    });
  }
}
