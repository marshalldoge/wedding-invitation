/* eslint-disable max-lines */
import {
  aws_s3 as s3, RemovalPolicy,
  aws_cloudfront as cloudfront,
  Stack,
  aws_s3_deployment as s3Deploy,
} from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { AllowedMethods, CachedMethods, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';

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
    });
  }
}
