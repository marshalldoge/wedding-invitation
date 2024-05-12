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

    const apiGateway = new apigateway.RestApi(
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

    const lambdaRole = new iam.Role(this, 'assetTrackingApplicationRole', {
      roleName: `wedding-invitation-lambda-role`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

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

    const weddingBackendResource = apiGateway.root.addResource('guests');
    const findGuestsResource = weddingBackendResource.addProxy({
      anyMethod: true,
      defaultIntegration: new apigateway.LambdaIntegration(lambdaFunction),
      defaultMethodOptions: {
        apiKeyRequired: true,
      } });

  }
}
