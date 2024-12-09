"use server";

import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { api_key } from "@prisma/client";

interface Response {
	api_key: api_key | null;
}

export const getAPIKeyAction = actionHandler<Response>(async () => {
	const { id } = await verifyAuthToken();

	const prisma = getPrismaClient();

	const apiKey = await prisma.api_key.findUnique({
		where: {
			user_id: id,
		},
	});

	return {
		success: true,
		code: 200,
		data: {
			api_key: apiKey,
		},
	};
});
