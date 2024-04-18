#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { APIStack } from "../lib/api/api-stack";
import { Construct } from "constructs";
import { StorageStack } from "../lib/storage/storage-stack";
import { AuthenticationStack } from "../lib//authentication/authentication-stack";

const app = new cdk.App();
const apiStack = new APIStack(app, "ApiStack");
const storageStack = new StorageStack(app, "StorageStack");
