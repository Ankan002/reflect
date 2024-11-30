"use client";

import { useRouter } from "next/navigation";
import { useAuthStateStore } from "@/store";

type ErrorHandlerFunc = (error: Error) => void;

export const useAPIErrorHandler = () => {
	const router = useRouter();
	const { setIsAuthenticated } = useAuthStateStore();

	const protectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					// showToastNotification(true, "You are not authenticated!!");
					setIsAuthenticated(false);
					router.replace("/login");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				// showToastNotification(true, error.message);
				return;
			}

			// showToastNotification(true, "Some Error Occurred!!");
		};

	const unprotectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					// showToastNotification(
					// 	true,
					// 	"You are already authenticated!!",
					// );
					setIsAuthenticated(true);
					router.replace("/");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				// showToastNotification(true, error.message);
				return;
			}

			// showToastNotification(true, "Some Error Occurred!!");
		};

	const APIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				console.log(error);

				if (customHandler) {
					customHandler(error);
					return;
				}

				// showToastNotification(true, error.message);
				return;
			}

			// showToastNotification(true, "Some Error Occurred!!");
		};

	return {
		protectedAPIErrorHandler,
		unprotectedAPIErrorHandler,
		APIErrorHandler,
	};
};
