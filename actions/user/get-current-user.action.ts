"use server";

import { APIError } from "@/types/error";
import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { user } from "@prisma/client";

interface Response {
	user: user;
}

export const getCurrentUser = actionHandler<Response>(async () => {
	const { id } = await verifyAuthToken();

	const prisma = getPrismaClient();

	console.log("HERE");

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	console.log("HERE2");

	if (!user) {
		throw new APIError("No user found", 404);
	}

	return {
		success: true,
		code: 200,
		data: {
			user,
		},
	};
});
