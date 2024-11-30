"use server";

import {
	actionHandler,
	getPrismaClient,
	verifyMagicToken,
} from "@/utils/server";
import { z } from "zod";
import { APIError } from "@/types/error";
import { AuthTokenData } from "@/types/common";
import { sign } from "jsonwebtoken";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_SECRET, ENV } from "@/constants/env";
import { cookies } from "next/headers";

const ArgsSchema = z.object({
	token: z
		.string({
			invalid_type_error: "Token should be of type string",
			required_error: "Please provide a token",
		})
		.trim(),
	name: z
		.string({
			invalid_type_error: "Name should of type string",
			required_error: "Please provide a name",
		})
		.min(1, "Name should be at least 1 character long")
		.trim()
		.optional(),
});

type Args = z.infer<typeof ArgsSchema>;

export const verifyMagicLink = actionHandler<undefined, Args>(async (args) => {
	if (!args) {
		throw new APIError("Please provide some args", 400);
	}

	const requestBodyValidationResult = ArgsSchema.safeParse(args);

	if (!requestBodyValidationResult.success) {
		throw new APIError(
			requestBodyValidationResult.error.issues[0].message ?? "",
			400,
		);
	}

	const requestBody = requestBodyValidationResult.data;

	const { email, newAccount } = await verifyMagicToken(requestBody.token);

	if (newAccount && !requestBody.name) {
		throw new APIError("Please provide a name", 400);
	}

	const prisma = getPrismaClient();

	const user = await prisma.user.upsert({
		where: {
			email: email ?? null,
		},
		create: {
			name: requestBody.name ?? "",
			email: email,
		},
		update: {},
	});

	const authTokenData: AuthTokenData = {
		email: user.email,
		id: user.id,
	};

	const authToken = sign(
		{
			user: authTokenData,
		},
		AUTH_TOKEN_SECRET,
	);

	const cookieStore = await cookies();
	cookieStore.set(AUTH_COOKIE_NAME, authToken, {
		httpOnly: true,
		secure: ENV === "production",
		expires: 1000 * 60 * 60 * 24 * 365,
	});

	return {
		success: true,
		code: 200,
	};
});
