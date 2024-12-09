import { createGenerateImageRequestAction } from "@/actions/generate-image";
import { getImageChatAction } from "@/actions/image-chat";
import { useAPIErrorHandler } from "@/hooks";
import { onTextareaInputChange } from "@/utils/client";
import { chat_config, image_gen_chat } from "@prisma/client";
import { useEffect, useState } from "react";

interface Args {
	id: string;
}

type ImageGenChat = image_gen_chat & {
	chat_config: chat_config | null;
};

export const useChatScreen = (args: Args) => {
	const [chat, setChat] = useState<image_gen_chat | null>(null);
	const [isLoadingChat, setIsLoadingChat] = useState(false);
	const [chatConfig, setChatConfig] = useState<chat_config | null>(null);
	const [prompt, setPrompt] = useState<string>("");

	const { protectedAPIErrorHandler } = useAPIErrorHandler();
	const fetchChatErrorHandler = protectedAPIErrorHandler();
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

	const onGeneratePrompt = async () => {
		// TODO: Handle states here

		try {
			const response = await createGenerateImageRequestAction({
				chatId: args.id,
				prompt,
			});

			console.log(response);
		} catch (error) {
			sendPromptErrorHandler(error);
		}
	};

	useEffect(() => {
		fetchChat();
	}, [args.id]);

	return {
		chat,
		chatConfig,
		isLoadingChat,
		prompt,
		onPromptChange: onTextareaInputChange(setPrompt),
		onGeneratePrompt,
	};
};
