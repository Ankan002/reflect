import {
	createGenerateImageRequestAction,
	getChatMessagesAction,
} from "@/actions/generate-image";
import { getImageChatAction } from "@/actions/image-chat";
import { useAPIErrorHandler } from "@/hooks";
import { onTextareaInputChange } from "@/utils/client";
import {
	ai_image,
	chat_config,
	image_gen_chat,
	image_gen_chat_message,
} from "@prisma/client";
import { useEffect, useState } from "react";

interface Args {
	id: string;
}

type ImageGenChat = image_gen_chat & {
	chat_config: chat_config | null;
};

type ImageGenChatMessage = image_gen_chat_message & {
	images?: ai_image[];
};

export const useChatScreen = (args: Args) => {
	const [chat, setChat] = useState<image_gen_chat | null>(null);
	const [isLoadingChat, setIsLoadingChat] = useState(false);
	const [chatConfig, setChatConfig] = useState<chat_config | null>(null);
	const [prompt, setPrompt] = useState<string>("");
	const [messages, setMessages] = useState<ImageGenChatMessage[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [creatingImages, setCreatingImages] = useState(false);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();
	const fetchChatErrorHandler = protectedAPIErrorHandler();
	const fetchMessagesErrorHandler = protectedAPIErrorHandler();
	const sendPromptErrorHandler = protectedAPIErrorHandler();

	const fetchChat = async () => {
		if (isLoadingChat) return;

		setIsLoadingChat(true);

		try {
			const response = await getImageChatAction({
				chatId: args.id,
			});

			setIsLoadingChat(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				throw new Error(response.error);
			}

			if (!response.data) {
				throw new Error("Something went wrong");
			}

			console.log(response);

			setChat(response.data.chat);

			if ((response.data.chat as ImageGenChat).chat_config) {
				setChatConfig((response.data.chat as ImageGenChat).chat_config);
			}
		} catch (error) {
			setIsLoadingChat(false);
			fetchChatErrorHandler(error);
		}
	};

	const fetchMessages = async () => {
		if (loadingMessages) return;

		setLoadingMessages(true);

		try {
			const response = await getChatMessagesAction({
				id: args.id,
			});

			setLoadingMessages(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				throw new Error(response.error);
			}

			if (!response.data) {
				throw new Error("Something went wrong");
			}

			console.log(response);

			setMessages(response.data.messages);
		} catch (error) {
			setLoadingMessages(false);
			fetchMessagesErrorHandler(error);
		}
	};

	const onGeneratePrompt = async () => {
		if (creatingImages) return;

		setCreatingImages(true);

		try {
			const response = await createGenerateImageRequestAction({
				chatId: args.id,
				prompt,
			});

			setCreatingImages(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				throw new Error(response.error);
			}

			if (!response.data) {
				throw new Error("Something went wrong");
			}

			setPrompt("");
			setMessages((prev) => [
				...(response.data?.messages ?? []),
				...prev,
			]);
		} catch (error) {
			setCreatingImages(false);
			sendPromptErrorHandler(error);
		}
	};

	useEffect(() => {
		fetchChat();
		fetchMessages();
	}, [args.id]);

	return {
		chat,
		chatConfig,
		isLoadingChat,
		prompt,
		onPromptChange: onTextareaInputChange(setPrompt),
		onGeneratePrompt,
		messages,
		loadingMessages,
		creatingImages,
	};
};
