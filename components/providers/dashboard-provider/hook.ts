import {
	useAppLoadStateStore,
	useThemeStore,
	useUserLoadStore,
	useUserStore,
} from "@/store";
import { useEffect } from "react";

export const useDashboardProvider = () => {
	const { isUserLoading } = useUserLoadStore();
	const { user } = useUserStore();
	const { isAppLoaded } = useAppLoadStateStore();
	const { theme } = useThemeStore();

	useEffect(() => {
		console.log(user);
	}, [user]);

	return {
		isUserLoading,
		user,
		isAppLoaded,
		theme,
	};
};
