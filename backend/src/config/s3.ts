import S3 from 'aws-sdk/clients/s3';

export const s3Config = {
  Bucket: process.env.AWS_BUCKET_NAME!,
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

const s3 = new S3({
  region: s3Config.region,
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
});

export default s3;
