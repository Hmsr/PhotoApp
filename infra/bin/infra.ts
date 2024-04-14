#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BaseStack } from "../lib/base-stack";
import { Construct } from "constructs";
import { StorageStack } from "../lib/storage/storage-stack";

const app = new cdk.App();
new BaseStack(app, "BaseStack");
new StorageStack(app, "StorageStack");
