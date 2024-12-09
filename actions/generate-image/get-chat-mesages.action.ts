"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { image_gen_chat_message } from "@prisma/client";
import { z } from "zod";

const ArgsSchema = z.object({
	id: z
		.string({
			required_error: "Please provide a chatId",
			invalid_type_error: "ChatId must be a string",
		})
		.trim()
		.uuid("Invalid chatId"),
});

type Args = z.infer<typeof ArgsSchema>;

interface Response {
	messages: image_gen_chat_message[];
}

export const getChatMessagesAction = actionHandler<Response, Args>(
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

		const chats = await prisma.image_gen_chat_message.findMany({
			where: {
				chat_id: argsData.id,
				chat: {
					user_id: id,
				},
			},
			include: {
				images: true,
			},
			orderBy: {
				created_at: "desc",
			},
		});

		return {
			success: true,
			code: 200,
			data: {
				messages: chats,
			},
		};
	}
);
