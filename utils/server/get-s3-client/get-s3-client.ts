import {
	S3_ACCESS_KEY,
	S3_ENDPOINT,
	S3_REGION,
	S3_SECRET_KEY,
} from "@/constants/env";
import { S3Client } from "@aws-sdk/client-s3";

const Client = {
	client: new S3Client({
		region: S3_REGION,
		endpoint: S3_ENDPOINT,
		credentials: {
			accessKeyId: S3_ACCESS_KEY,
			secretAccessKey: S3_SECRET_KEY,
		},
		forcePathStyle: true,
	}),
};

Object.freeze(Client);

export const getS3Client = () => Client.client;
