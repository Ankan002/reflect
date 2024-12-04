"use server";

import { actionHandler } from "@/utils/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/env";

interface Response {
	isAuthenticated: boolean;
}

export const isPrevAuthenticated = actionHandler<Response>(async () => {
	const cookieStore = await cookies();
	const authCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;

	if (!authCookie) {
		return {
			success: true,
			code: 200,
			data: {
				isAuthenticated: false,
			},
		};
	}

	return {
		success: true,
		code: 200,
		data: {
			isAuthenticated: true,
		},
	};
});
