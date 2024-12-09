"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	getPrismaClient,
	getS3Client,
	verifyAuthToken,
} from "@/utils/server";
import { image_gen_chat_message } from "@prisma/client";
import { z } from "zod";
import replicate from "replicate";
import { BASE_DOMAIN, S3_BUCKET_NAME, S3_ENDPOINT } from "@/constants/env";
import { buffer } from "node:stream/consumers";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

const ArgsSchema = z.object({
	prompt: z
		.string({
			required_error: "Prompt is required",
			invalid_type_error: "Prompt must be a string",
		})
		.trim()
		.min(1, "Prompt must not be empty"),
	chatId: z
		.string({
			required_error: "Please provide a chatId",
			invalid_type_error: "ChatId must be a string",
		})
		.uuid("Invalid chatId"),
});

type Args = z.infer<typeof ArgsSchema>;

interface ResponseData {
	messages: image_gen_chat_message[];
}

export const createGenerateImageRequestAction = actionHandler<
	ResponseData,
	Args
>(async (args) => {
	const { id } = await verifyAuthToken();

	const argsValidationResult = ArgsSchema.safeParse(args);

	if (!argsValidationResult.success) {
		throw new APIError(argsValidationResult.error.issues[0].message, 400);
	}

	const argsData = argsValidationResult.data;

	const prisma = getPrismaClient();

	const apiKey = await prisma.api_key.findUnique({
		where: {
			user_id: id,
		},
	});

	if (!apiKey) {
		throw new APIError("API Key not found", 404);
	}

	const chat = await prisma.image_gen_chat.findUnique({
		where: {
			id: argsData.chatId,
			user_id: id,
		},
		include: {
			chat_config: true,
		},
	});

	if (!chat || chat.chat_config === null) {
		throw new APIError("Chat not found", 404);
	}

	const replicateInstance = new replicate({
		auth: apiKey.key,
	});

	const replicateResponses = await replicateInstance.run(
		"black-forest-labs/flux-schnell",
		{
			input: {
				prompt: argsData.prompt,
				disable_safety_checker: true,
				output_format: chat.chat_config.output_format,
				aspect_ratio: chat.chat_config.aspect_ratio,
				num_outputs: chat.chat_config.number_of_output,
			},
			wait: {
				mode: "block",
				timeout: 60,
			},
		}
	);

	const s3Client = getS3Client();
	const fileUrls = [];

	if (replicateResponses instanceof Array) {
		for (const replicateResponse of replicateResponses) {
			if (replicateResponse instanceof ReadableStream) {
				const fileBuffer = await new Response(
					replicateResponse
				).arrayBuffer();

				const fileKey = `${randomUUID()}.${
					chat.chat_config.output_format
				}`;

				const command = new PutObjectCommand({
					Bucket: S3_BUCKET_NAME,
					Key: fileKey,
					Body: Buffer.from(fileBuffer),
					ACL: "public-read",
				});

				await s3Client.send(command);

				const url = `${S3_ENDPOINT}/${S3_BUCKET_NAME}/${fileKey}`;
				fileUrls.push(url);
			}
		}
	}

	const userMessage = await prisma.image_gen_chat_message.create({
		data: {
			prompt: argsData.prompt,
			chat_id: argsData.chatId,
			role: "user",
		},
	});

	const aiMessage = await prisma.image_gen_chat_message.create({
		data: {
			chat_id: argsData.chatId,
			role: "system",
			prompt: "",
			status: "delivered",
		},
	});

	await prisma.ai_image.createMany({
		data: fileUrls.map((url) => ({
			message_id: aiMessage.id,
			aspect_ratio: chat.chat_config!.aspect_ratio,
			asset_url: url,
			user_id: id,
		})),
	});

	const updatedAIMessage = await prisma.image_gen_chat_message.findUnique({
		where: {
			id: aiMessage.id,
		},
		include: {
			images: true,
		},
	});

	if (!updatedAIMessage) {
		throw new APIError("Something went wrong", 400);
	}

	return {
		success: true,
		code: 200,
		data: {
			messages: [updatedAIMessage, userMessage],
		},
	};
});
