"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	generateNewImage,
	getPrismaClient,
	uploadToS3,
	verifyAuthToken,
} from "@/utils/server";
import { image_gen_chat_message, Prisma } from "@prisma/client";
import { z } from "zod";

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
	avoid_context: z.boolean().optional(),
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

	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			api_key: true,
		},
		relationLoadStrategy: "join",
	});

	if (!user) {
		throw new APIError("No user found!", 404);
	}

	const apiKey = user.api_key;

	if (user.role !== "admin" && user.role !== "dev_friend" && !apiKey) {
		throw new APIError("API Key not found", 404);
	}

	const oldChatContext = argsData.avoid_context
		? ""
		: (
				(await prisma.image_gen_chat_message.findMany({
					where: {
						chat_id: argsData.chatId,
						NOT: {
							prompt: undefined,
						},
					},
				})) ?? []
			)
				.map((chat) => chat.prompt)
				.join(" ");

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

	console.log(argsData.prompt);

	const imagesGenerated = await generateNewImage({
		style: chat.chat_config.image_style,
		prompt: argsData.avoid_context
			? argsData.prompt
			: `${oldChatContext} ${argsData.prompt}`,
		admin: user.role === "admin" || user.role === "dev_friend",
		numberOfOutput: chat.chat_config.number_of_outputs,
		apiKey: user.api_key?.key,
	});

	console.log(imagesGenerated);

	const s3ImagePromises = [];

	for (const image of imagesGenerated) {
		const response = await fetch(image);

		if (!response.ok || !response.body) {
			throw new APIError("Something went wrong!", 400);
		}

		const contentType =
			response.headers.get("content-type") || "application/octet-stream";

		s3ImagePromises.push(
			uploadToS3({
				content: response.body,
				contentType,
			}),
		);
	}

	const fileResponses = await Promise.allSettled(s3ImagePromises);

	// const s3Client = getS3Client();
	// const fileUrls = [];

	// if (replicateResponses instanceof Array) {
	// 	for (const replicateResponse of replicateResponses) {
	// 		if (replicateResponse instanceof ReadableStream) {
	// 			const fileBuffer = await new Response(
	// 				replicateResponse,
	// 			).arrayBuffer();

	// 			const fileKey = `${randomUUID()}.${
	// 				chat.chat_config.output_format
	// 			}`;

	// 			const command = new PutObjectCommand({
	// 				Bucket: S3_BUCKET_NAME,
	// 				Key: fileKey,
	// 				Body: Buffer.from(fileBuffer),
	// 				ACL: "public-read",
	// 			});

	// 			await s3Client.send(command);

	// 			const url = `${S3_ENDPOINT}/${S3_BUCKET_NAME}/${fileKey}`;
	// 			fileUrls.push(url);
	// 		}
	// 	}
	// }

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

	const multipleImagesData: Prisma.ai_imageCreateManyInput[] = [];

	for (const fileResponse of fileResponses) {
		console.log(fileResponse);

		if (fileResponse.status === "fulfilled") {
			multipleImagesData.push({
				user_id: id,
				public_url: fileResponse.value.url,
				file_key: fileResponse.value.key,
				message_id: aiMessage.id,
			});
		}
	}

	await prisma.ai_image.createMany({
		data: multipleImagesData,
	});

	// await prisma.ai_image.createMany({
	// 	data: fileUrls.map((url) => ({
	// 		message_id: aiMessage.id,
	// 		aspect_ratio: chat.chat_config!.aspect_ratio,
	// 		asset_url: url,
	// 		user_id: id,
	// 	})),
	// });

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
