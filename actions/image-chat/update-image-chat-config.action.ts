import { actionHandler, getPrismaClient } from "@/utils/server";
import { chat_config } from "@prisma/client";
import { APIError } from "@/types/error";
import { z } from "zod";

const ArgsSchema = z.object({
	image_style: z.union([z.literal("vivid"), z.literal("natural")], {
		required_error: "Please provide a style",
		invalid_type_error: "Image style must be natural or vivid",
	}),
	chat_id: z
		.string({
			required_error: "Please provide a chat id",
			invalid_type_error: "Chat Id must be of type string",
		})
		.trim()
		.uuid("Chat Id must an uuid")
		.optional(),
	use_context: z
		.boolean({
			required_error: "Please provide a context",
			invalid_type_error: "Use Context must be of type boolean",
		})
		.optional(),
});

interface ResponseData {
	chat_config: chat_config;
}

export const updateImageChatConfigAction = actionHandler<ResponseData>(
	async (args) => {
		const requestValidationResult = ArgsSchema.safeParse(args);

		if (!requestValidationResult.success) {
			throw new APIError(
				requestValidationResult.error.issues[0].message,
				400,
			);
		}

		const { image_style, chat_id, use_context } =
			requestValidationResult.data;

		const prisma = getPrismaClient();

		const updatedChatConfig = await prisma.chat_config.update({
			where: {
				chat_id,
			},
			data: {
				image_style: image_style,
				use_context,
			},
		});

		return {
			success: true,
			code: 200,
			data: {
				chat_config: updatedChatConfig,
			},
		};
	},
);
