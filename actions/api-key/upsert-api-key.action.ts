"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { api_key } from "@prisma/client";
import { z } from "zod";

const ArgsSchema = z.object({
	replicate_key: z
		.string({
			required_error: "Please provide a replicate API key",
			invalid_type_error: "Replicate API key should be of type string",
		})
		.trim(),
});

interface Response {
	api_key: api_key;
}

type Args = z.infer<typeof ArgsSchema>;

export const upsertAPIKeyAction = actionHandler<Response, Args>(
	async (args) => {
		const { id } = await verifyAuthToken();

		const argsSchemaValidationResult = ArgsSchema.safeParse(args);

		if (!argsSchemaValidationResult.success) {
			throw new APIError(
				argsSchemaValidationResult.error.issues[0].message,
				400
			);
		}

		const prisma = getPrismaClient();
		const argsData = argsSchemaValidationResult.data;

		const apiKey = await prisma.api_key.upsert({
			where: {
				user_id: id,
			},
			create: {
				key: argsData.replicate_key,
				user_id: id,
			},
			update: {
				key: argsData.replicate_key,
			},
		});

		return {
			success: true,
			code: 200,
			data: {
				api_key: apiKey,
			},
		};
	}
);
