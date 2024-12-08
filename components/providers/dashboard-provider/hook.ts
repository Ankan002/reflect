import { useAppLoadStateStore, useUserLoadStore, useUserStore } from "@/store";

export const useDashboardProvider = () => {
	const { isUserLoading } = useUserLoadStore();
	const { user } = useUserStore();
	const { isAppLoaded } = useAppLoadStateStore();

	return {
		isUserLoading,
		user,
		isAppLoaded,
	};
};
