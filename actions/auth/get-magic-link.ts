"use server";

import { APIError } from "@/types/error";
import { actionHandler, getPrismaClient, sendMagicLink } from "@/utils/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { MagicLinkTokenData } from "@/types/common";
import { BASE_DOMAIN, MAGIC_TOKEN_SECRET } from "@/constants/env";

const ArgsSchema = z.object({
	email: z
		.string({
			required_error: "Please provide an email",
			invalid_type_error: "Email should be of type string",
		})
		.email("Please provide a valid email as email"),
});

type Args = z.infer<typeof ArgsSchema>;

export const getMagicLink = actionHandler<undefined, Args>(async (args) => {
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

	const prisma = getPrismaClient();

	const oldAccount = await prisma.user.findUnique({
		where: {
			email: requestBody.email,
		},
	});

	if (!oldAccount) {
		const tokenData: MagicLinkTokenData = {
			email: requestBody.email,
			newAccount: true,
		};

		const magicLinkToken = jwt.sign(
			{
				data: tokenData,
			},
			MAGIC_TOKEN_SECRET,
			{
				expiresIn: "10m",
			},
		);

		await sendMagicLink({
			recipient: requestBody.email,
			magicLink: `${BASE_DOMAIN}/auth/magic-link?token=${magicLinkToken}&new-account=true`,
		});

		return {
			success: true,
			code: 200,
		};
	}

	const tokenData: MagicLinkTokenData = {
		email: requestBody.email,
		newAccount: false,
	};

	const magicLinkToken = jwt.sign(
		{
			data: tokenData,
		},
		MAGIC_TOKEN_SECRET,
		{
			expiresIn: "5m",
		},
	);

	await sendMagicLink({
		recipient: requestBody.email,
		magicLink: `${BASE_DOMAIN}/auth/magic-link?token=${magicLinkToken}&new-account=false`,
	});

	return {
		success: true,
		code: 200,
	};
});
