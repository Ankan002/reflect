import { isPrevAuthenticated } from "@/actions/auth";
import { useAPIErrorHandler } from "@/hooks";
import { useAppLoadStateStore, useAuthStateStore } from "@/store";
import { useRef, useEffect } from "react";

export const useLoadManager = () => {
	const { isAppLoaded, setIsAppLoaded } = useAppLoadStateStore();
	const { setIsAuthenticated, isAuthenticated } = useAuthStateStore();
	const { APIErrorHandler } = useAPIErrorHandler();

	const isAppMounted = useRef<boolean>(false);

	const loadManagerErrorHandler = APIErrorHandler();

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

	useEffect(() => {
		if (isAppMounted.current) return;

		isAppMounted.current = true;
		checkAuthenticated();
	}, []);

	useEffect(() => {
		if (isAppLoaded && isAuthenticated) {
			// TODO: Load user and perform other tasks here
		}
	}, [isAppLoaded, isAuthenticated]);
};
