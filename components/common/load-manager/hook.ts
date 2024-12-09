import { isPrevAuthenticated } from "@/actions/auth";
import { getImageChatsAction } from "@/actions/image-chat";
import { getCurrentUser } from "@/actions/user";
import { useAPIErrorHandler } from "@/hooks";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useChatLoadStateStore,
	useImageChatsStateStore,
	useUserLoadStore,
	useUserStore,
} from "@/store";
import { useRef, useEffect } from "react";

export const useLoadManager = () => {
	const { isAppLoaded, setIsAppLoaded } = useAppLoadStateStore();
	const { setIsAuthenticated, isAuthenticated } = useAuthStateStore();
	const { updateUser } = useUserStore();
	const { setChats } = useImageChatsStateStore();
	const { isChatLoading, setIsChatLoading } = useChatLoadStateStore();
	const { isUserLoading, setIsUserLoading } = useUserLoadStore();
	const { APIErrorHandler, protectedAPIErrorHandler } = useAPIErrorHandler();

	const isAppMounted = useRef<boolean>(false);

	const loadManagerErrorHandler = APIErrorHandler();
	const loadUserManagerErrorHandler = protectedAPIErrorHandler();
	const loadChatErrorHandler = protectedAPIErrorHandler();

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

	const loadChats = async () => {
		if (isChatLoading) return;

		setIsChatLoading(true);

		try {
			const chatResponse = await getImageChatsAction();

			if (chatResponse.code === 401) {
				throw new Error("401");
			}

			if (!chatResponse.success) {
				throw new Error(chatResponse.error);
			}

			if (!chatResponse.data) {
				throw new Error("Something went wrong!");
			}

			console.log(chatResponse);

			setChats(chatResponse.data.chats);

			setIsChatLoading(false);
		} catch (error) {
			setIsChatLoading(false);
			loadChatErrorHandler(error);
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
			loadChats();
		}
	}, [isAppLoaded, isAuthenticated]);
};
