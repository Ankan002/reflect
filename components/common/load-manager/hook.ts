import { isPrevAuthenticated } from "@/actions/auth";
import { getCurrentUser } from "@/actions/user";
import { useAPIErrorHandler } from "@/hooks";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useUserLoadStore,
	useUserStore,
} from "@/store";
import { useRef, useEffect } from "react";

export const useLoadManager = () => {
	const { isAppLoaded, setIsAppLoaded } = useAppLoadStateStore();
	const { setIsAuthenticated, isAuthenticated } = useAuthStateStore();
	const { updateUser } = useUserStore();
	const { isUserLoading, setIsUserLoading } = useUserLoadStore();
	const { APIErrorHandler, protectedAPIErrorHandler } = useAPIErrorHandler();

	const isAppMounted = useRef<boolean>(false);

	const loadManagerErrorHandler = APIErrorHandler();
	const loadUserManagerErrorHandler = protectedAPIErrorHandler();

	const checkAuthenticated = async () => {
		setIsAppLoaded(true);

		try {
			const prevAuthResponse = await isPrevAuthenticated();

			console.log(prevAuthResponse);

			if (!prevAuthResponse.success) {
				throw new Error(prevAuthResponse.error);
			}

			if (
				prevAuthResponse.success &&
				prevAuthResponse.data?.isAuthenticated
			) {
				setIsAuthenticated(prevAuthResponse.data?.isAuthenticated);
			}
		} catch (error) {
			loadManagerErrorHandler(error);
		}
	};

	const loadUser = async () => {
		if (isUserLoading) return;

		try {
			setIsUserLoading(true);

			const userResponse = await getCurrentUser();

			console.log(userResponse);

			if (userResponse.code === 401) {
				throw new Error("401");
			}

			if (!userResponse.success) {
				throw new Error(userResponse.error);
			}

			if (!userResponse.data) {
				throw new Error("Something went wrong!");
			}

			updateUser(userResponse.data.user);

			setIsUserLoading(false);
		} catch (error) {
			setIsUserLoading(false);
			loadUserManagerErrorHandler(error);
		}
	};

	useEffect(() => {
		if (isAppMounted.current) return;

		isAppMounted.current = true;
		checkAuthenticated();
	}, []);

	useEffect(() => {
		if (isAppLoaded && isAuthenticated) {
			loadUser();
		}
	}, [isAppLoaded, isAuthenticated]);
};
