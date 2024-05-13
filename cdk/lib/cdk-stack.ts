/* eslint-disable max-lines */
import {
  aws_cloudfront as cloudfront,
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  aws_apigateway as apigateway,
  aws_lambda as lambda,
  aws_iam as iam,
  aws_dynamodb as dynamodb,
  RemovalPolicy,
  Stack, Duration,
} from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { AllowedMethods, CachedMethods, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

// eslint-disable-next-line import/prefer-default-export
export class CdkStack extends Stack {
  // eslint-disable-next-line max-lines-per-function
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const weddingInvitationS3Bucket = new s3.Bucket(this, `wedding-invitation-s3`, {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    // eslint-disable-next-line max-len
    const weddingInvitationCDN = new cloudfront.Distribution(this, `wedding-invitation-cloudfront-distribution`, {
      defaultBehavior: {
        origin: new S3Origin(weddingInvitationS3Bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_ALL,
        compress: false,
        cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
      },
    });

    new s3Deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3Deploy.Source.asset('../dist')],
      destinationBucket: weddingInvitationS3Bucket,
      distribution: weddingInvitationCDN,
      distributionPaths: ['/*'],
      accessControl: BucketAccessControl.PUBLIC_READ
    });

    const guestsDynamoTable = new dynamodb.Table(this, 'guestsDynamoTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: 'wedding-guests',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const weddingApiGateway = new apigateway.RestApi(
      this,
      `wedding-invitation-api`,
      {
        cloudWatchRole: true,
        endpointTypes: [apigateway.EndpointType.REGIONAL],
        deployOptions: {
          stageName: 'v1',
          loggingLevel: apigateway.MethodLoggingLevel.INFO,
        },
      },
    );

    const apiKey = new apigateway.ApiKey(this, 'wedding-api-key', {
      apiKeyName: 'wedding-api-key'
    });

    const usagePlan = weddingApiGateway.addUsagePlan('wedding-api-usage-plan', {});
    usagePlan.addApiStage({
      api: weddingApiGateway,
      stage: weddingApiGateway.deploymentStage,
    });

    usagePlan.addApiKey(apiKey);

    const lambdaRole = new iam.Role(this, 'assetTrackingApplicationRole', {
      roleName: `wedding-invitation-lambda-role`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'dynamodb:BatchGetItem',
        'dynamodb:Scan',
        'dynamodb:Query',
        'dynamodb:GetItem',
        'dynamodb:DeleteItem',
        'dynamodb:PutItem',
      ],
      resources: [guestsDynamoTable.tableArn, guestsDynamoTable.tableArn],
    }));

    const lambdaFunction = new NodejsFunction(this, `wedding-invitation-backend`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      description: `Backend for wedding invitation`,
      entry: path.join(__dirname, '../lambda/index.ts'),
      role: lambdaRole,
      memorySize: 512,
      timeout: Duration.seconds(60),
      environment: {
        GUEST_DYNAMO_DB_TABLE_NAME: guestsDynamoTable.tableName
      },
      logRetention: 90,
    });

    lambdaFunction.addPermission(`wedding-invitation-lambda-permission`, {
      principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });

    // eslint-disable-next-line max-len
    const ALLOWED_HEADERS = ['Content-Type', 'X-Amz-Date', 'X-Amz-Security-Token', 'Authorization', 'X-Api-Key', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'];
    const weddingBackendResource = weddingApiGateway.root.addResource('guests', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ALLOWED_HEADERS,
        allowCredentials: true,
      }
    });

    const findGuestsResource = weddingBackendResource.addProxy({
      anyMethod: true,
      defaultIntegration: new apigateway.LambdaIntegration(lambdaFunction),
      defaultMethodOptions: {
        apiKeyRequired: true,
      } });
  }
}
