import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Architecture } from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import * as path from "path";

export class APIStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const domainName: string = "photos.hamish.ninja";

    const hostedZone = new cdk.aws_route53.HostedZone(this, "HostedZone", {
      zoneName: `${domainName}`,
    });

    const certificate = new cdk.aws_certificatemanager.Certificate(
      this,
      "Certificate",
      {
        domainName: `*.${domainName}`,
        certificateName: `PhotoAppCertificate`,
        validation:
          cdk.aws_certificatemanager.CertificateValidation.fromDns(hostedZone),
      }
    );

    const api = new apigateway.RestApi(this, "API", {
      restApiName: "PhotoAppApi",

      description: "Photo App ExpressJS Backend API",

      domainName: {
        domainName: `api.${domainName}`,
        certificate: certificate,
      },
    });

    const dns = new cdk.aws_route53.RecordSet(this, "PhotoAppApiDNS", {
      recordName: "PhotoAppApiDNS",
      recordType: cdk.aws_route53.RecordType.A,
      zone: hostedZone,
      target: cdk.aws_route53.RecordTarget.fromAlias(
        new cdk.aws_route53_targets.ApiGateway(api)
      ),
    });

    const handler = new cdk.aws_lambda_nodejs.NodejsFunction(this, "Function", {
      functionName: "PhotoAppApiHandler",
      architecture: Architecture.X86_64,
      entry: path.join(__dirname, "handler.ts"),
      handler: "index.handler",
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
    });

    const userPool = new cognito.UserPool(this, "photoAppUserPool", {
      userPoolName: "photoAppUserPool",
      autoVerify: {
        email: true,
      },
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      // removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const auth = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      "PhotoAppCognitoAuthorizer",
      {
        cognitoUserPools: [userPool],
      }
    );

    const proxy = api.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(handler),
      //add authorizer
      defaultMethodOptions: {
        authorizer: auth,
        authorizationType: apigateway.AuthorizationType.COGNITO, //authorization type
      },
    });
  }
}
