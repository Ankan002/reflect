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
	number_of_output: z
		.number({
			required_error: "Please provide the number of output",
			invalid_type_error: "Number of outputs must be a number",
		})
		.min(1, "Min output is 1")
		.max(4, "Max output is 4"),
	output_format: z.union([z.literal("webp"), z.literal("png")], {
		required_error: "Please provide an output format",
		invalid_type_error: "Output format should either be png or webp",
	}),
	aspect_ratio: z.union(
		[
			z.literal("1:1"),
			z.literal("16:9"),
			z.literal("21:9"),
			z.literal("3:2"),
			z.literal("2:3"),
			z.literal("4:5"),
			z.literal("5:4"),
			z.literal("3:4"),
			z.literal("4:3"),
			z.literal("9:16"),
			z.literal("9:21"),
		],
		{
			required_error: "Please provide an aspect ratio",
			invalid_type_error: "Please pick a valid option",
		}
	),
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
				400
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
				number_of_output: argsData.number_of_output,
				output_format: argsData.output_format,
				aspect_ratio: argsData.aspect_ratio,
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
	}
);
