"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { image_gen_chat } from "@prisma/client";
import { z } from "zod";

const ArgsSchema = z.object({
	chatId: z
		.string({
			required_error: "Please provide a chatId",
			invalid_type_error: "ChatId must be a string",
		})
		.uuid("Invalid chatId"),
});

type Args = z.infer<typeof ArgsSchema>;

interface Response {
	chat: image_gen_chat;
}

export const getImageChatAction = actionHandler<Response, Args>(
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

		const chat = await prisma.image_gen_chat.findUnique({
			where: {
				id: argsData.chatId,
				user_id: id,
			},
			include: {
				chat_config: true,
			},
		});

		if (!chat) {
			throw new APIError("Chat not found", 404);
		}

		return {
			success: true,
			code: 200,
			data: {
				chat,
			},
		};
	}
);
