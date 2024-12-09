import { JsonWebTokenError } from "jsonwebtoken";
import type { ActionController } from "@/types/api";
import { APIError } from "@/types/error";

export const actionHandler =
	<D = void, A = Record<string, never>>(
		controllerFunc: ActionController<D, A>
	): ActionController<D, A> =>
	async (args?: A) => {
		try {
			return await Promise.resolve(controllerFunc(args));
		} catch (error) {
			if (error instanceof JsonWebTokenError) {
				console.log(error);
				return {
					success: false,
					code: 401,
					error: error.message,
				};
			}

			if (error instanceof APIError) {
				return {
					success: false,
					code: error.code,
					error: error.message,
				};
			}

			if (error instanceof Error) {
				return {
					success: false,
					code: 400,
					error: error.message,
				};
			}

			return {
				success: false,
				code: 500,
				error: "Internal Server Error!!",
			};
		}
	};
