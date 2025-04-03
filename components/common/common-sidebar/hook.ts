import {
	useChatLoadStateStore,
	useImageChatsStateStore,
	useUserStore,
	useUserLoadStore,
	useAppLoadStateStore,
	useThemeStore,
} from "@/store";
import { useState } from "react";
import { useAPIErrorHandler } from "@/hooks";
import { logoutAction } from "@/actions/auth";

export const useCommonSidebar = () => {
	const { isChatLoading } = useChatLoadStateStore();
	const { chats } = useImageChatsStateStore();
	const { user } = useUserStore();
	const { isUserLoading } = useUserLoadStore();
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
		isChatLoading,
		chats,
		user,
		isUserLoading,
		onLogout,
		isAppLoaded,
		theme,
	};
};
