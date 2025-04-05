import { Upload } from "@aws-sdk/lib-storage";
import { getS3Client } from "../get-s3-client";
import { randomUUID } from "crypto";
import { S3_BUCKET_NAME, S3_CDN_ENDPOINT } from "@/constants/env";

interface Args {
	content: Buffer | ReadableStream<Uint8Array>;
	contentType: string;
}

export const uploadToS3 = async (args: Args) => {
	const s3Instance = getS3Client();

	const fileKey = randomUUID();

	const publicUrl = `${S3_CDN_ENDPOINT}/${S3_BUCKET_NAME}/${fileKey}`;

	const upload = new Upload({
		client: s3Instance,
		params: {
			ACL: "public-read",
			Key: fileKey,
			Bucket: S3_BUCKET_NAME,
			Body: args.content,
			ContentType: args.contentType,
		},
	});

	console.log(await upload.done());
	console.log(publicUrl);

	return {
		url: publicUrl,
		key: fileKey,
	};
};
