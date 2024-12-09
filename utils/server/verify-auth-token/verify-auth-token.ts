"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_SECRET } from "@/constants/env";
import { APIError } from "@/types/error";
import { verify, JwtPayload } from "jsonwebtoken";
import { AuthTokenData } from "@/types/common";

interface AuthPayload extends JwtPayload {
	user?: AuthTokenData;
}

export const verifyAuthToken = async () => {
	const cookieStore = await cookies();
	const authCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;

	if (!authCookie) {
		throw new APIError("Unauthorized access", 401);
	}

	const decodedPayload = verify(authCookie, AUTH_TOKEN_SECRET) as AuthPayload;

	console.log(decodedPayload);

	if (!decodedPayload.user) {
		throw new APIError("Invalid token", 401);
	}

	return decodedPayload.user;
};
