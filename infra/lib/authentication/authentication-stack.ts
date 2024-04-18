import { Stack } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

import { Construct } from "constructs";

export class AuthenticationStack extends Stack {
  public readonly auth: apigateway.CognitoUserPoolsAuthorizer;

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
