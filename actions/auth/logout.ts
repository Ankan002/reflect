"use server";

import { AUTH_COOKIE_NAME } from "@/constants/env";
import { actionHandler, verifyAuthToken } from "@/utils/server";
import { cookies } from "next/headers";

export const logoutAction = actionHandler(async () => {
	await verifyAuthToken();

	const cookieStore = await cookies();

	cookieStore.delete(AUTH_COOKIE_NAME);

	return {
		success: true,
		code: 200,
	};
});
