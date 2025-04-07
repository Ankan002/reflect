"use client";

import { useRouter } from "next/navigation";
import { useAuthStateStore } from "@/store";
import { toast } from "sonner";

type ErrorHandlerFunc = (error: Error) => void;

export const useAPIErrorHandler = () => {
	const router = useRouter();
	const { setIsAuthenticated } = useAuthStateStore();

	//TODO: Remove auth token from here fpr preventing infinite load

	const protectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					toast.error("Unauthorized access");
					setIsAuthenticated(false);
					router.replace("/login");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast.error(error.message);
				return;
			}

			toast.error("Some Error Occurred!!");
		};

	const unprotectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					toast.error("You are already authenticated!!");
					setIsAuthenticated(true);
					router.replace("/");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast.error(error.message);
				return;
			}

			toast.error("Some Error Occurred!!");
		};

	const APIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				console.log(error);

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast.error(error.message);
				return;
			}

			toast.error("Some Error Occurred!!");
		};

	return {
		protectedAPIErrorHandler,
		unprotectedAPIErrorHandler,
		APIErrorHandler,
	};
};
