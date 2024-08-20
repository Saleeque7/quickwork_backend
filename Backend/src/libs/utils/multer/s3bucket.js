import { S3Client  } from "@aws-sdk/client-s3";
import config from '../../../config/config.js'

export const s3 = new S3Client({
  credentials: {
      accessKeyId:config.S3_BUCKET_ACCESS_KEY,
      secretAccessKey: config.S3_BUCKET_SECRET_ACCESS_KEY
  },
  region: config.S3_BUCKET_REGION
})
