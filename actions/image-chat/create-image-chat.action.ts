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
	chat_name: z
		.string({
			required_error: "Please provide a chat name",
			invalid_type_error: "Chat name should be of type string",
		})
		.trim()
		.min(1, "Name should be at least 1 character long"),
	image_style: z.union([z.literal("vivid"), z.literal("natural")], {
		required_error: "Please provide a style",
		invalid_type_error: "Image style must be natural or vivid",
	}),
});

interface Response {
	chat: Pick<image_gen_chat, "id" | "name">;
}

type Args = z.infer<typeof ArgsSchema>;

export const createImageChatAction = actionHandler<Response, Args>(
	async (args) => {
		const { id } = await verifyAuthToken();

		const argsValidationResult = ArgsSchema.safeParse(args);

		if (!argsValidationResult.success) {
			throw new APIError(
				argsValidationResult.error.issues[0].message,
				400,
			);
		}

		const argsData = argsValidationResult.data;

		const prisma = getPrismaClient();

		const chat = await prisma.image_gen_chat.create({
			data: {
				user_id: id,
				name: argsData.chat_name,
			},
		});

		await prisma.chat_config.create({
			data: {
				chat_id: chat.id,
				image_style: argsData.image_style,
			},
		});

		return {
			success: true,
			code: 200,
			data: {
				chat: {
					id: chat.id,
					name: chat.name,
				},
			},
		};
	},
);
