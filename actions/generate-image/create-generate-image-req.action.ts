"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { image_gen_chat_message } from "@prisma/client";
import { z } from "zod";
import replicate from "replicate";
import { BASE_DOMAIN } from "@/constants/env";

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

interface Response {
	messages: image_gen_chat_message[];
}

export const createGenerateImageRequestAction = actionHandler<Response, Args>(
	async (args) => {
		const { id } = await verifyAuthToken();

		const argsValidationResult = ArgsSchema.safeParse(args);

		if (!argsValidationResult.success) {
			throw new APIError(
				argsValidationResult.error.issues[0].message,
				400
			);
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

		if (!chat || !chat.chat_config) {
			throw new APIError("Chat not found", 404);
		}

		const replicateInstance = new replicate({
			auth: apiKey.key,
		});

		const res = await replicateInstance.run(
			"black-forest-labs/flux-schnell",
			{
				input: {
					prompt: argsData.prompt,
					disable_safety_checker: true,
					output_format: chat.chat_config.output_format,
					aspect_ratio: chat.chat_config.aspect_ratio,
					num_outputs: chat.chat_config.number_of_output,
				},
				webhook: `${BASE_DOMAIN}/api/image-gen/webhook/${argsData.chatId}`,
				webhook_events_filter: ["completed", "output"],
			}
		);

		console.log(res);

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
				status: "processing",
			},
		});

		return {
			success: true,
			code: 200,
			data: {
				messages: [userMessage, aiMessage],
			},
		};
	}
);
