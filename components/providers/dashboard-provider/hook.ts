import { logoutAction } from "@/actions/auth";
import { useAPIErrorHandler } from "@/hooks";
import {
	useAppLoadStateStore,
	useThemeStore,
	useUserLoadStore,
	useUserStore,
} from "@/store";
import { useState } from "react";

export const useDashboardProvider = () => {
	const { isUserLoading } = useUserLoadStore();
	const { user } = useUserStore();
	const { isAppLoaded } = useAppLoadStateStore();
	const { theme } = useThemeStore();

	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();

	const logoutErrorHandler = protectedAPIErrorHandler();

	const onLogout = async () => {
		if (isLoggingOut) return;

		setIsLoggingOut(true);

		try {
			const response = await logoutAction();

			setIsLoggingOut(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				throw new Error(response.error);
			}

			window.location.replace("/auth/login");
		} catch (error) {
			setIsLoggingOut(false);
			logoutErrorHandler(error);
		}
	};

	return {
		isUserLoading,
		user,
		isAppLoaded,
		theme,
		onLogout,
	};
};
