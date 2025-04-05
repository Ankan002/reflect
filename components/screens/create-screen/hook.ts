import { createImageChatAction } from "@/actions/image-chat";
import { useAPIErrorHandler } from "@/hooks";
import { useImageChatsStateStore, useThemeStore } from "@/store";
import { onTextInputChange } from "@/utils/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ImageStyleOptions = [
	{
		label: "Vivid",
		value: "vivid",
	},
	{
		label: "Natrual",
		value: "natural",
	},
];

export const useCreateScreen = () => {
	const { theme } = useThemeStore();

	const router = useRouter();

	const [chatName, setChatName] = useState<string>("");
	const [imageStyle, setImageStyle] = useState<string>("vivid");

	const { addChat } = useImageChatsStateStore();

	const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();
	const createChatErrorHandler = protectedAPIErrorHandler();

	const onCreateChatClick = async () => {
		if (isCreatingChat) return;

		setIsCreatingChat(true);

		try {
			const response = await createImageChatAction({
				chat_name: chatName,
				image_style: imageStyle as "vivid" | "natural",
			});

			setIsCreatingChat(false);

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

			addChat(response.data.chat);
			router.replace(`/chat/${response.data.chat.id}`);
		} catch (error) {
			setIsCreatingChat(false);
			createChatErrorHandler(error);
		}
	};

	const onImageStyleChange = (value: string) => {
		setImageStyle(value);
	};

	return {
		theme,
		ImageStyleOptions,
		imageStyle,
		onImageStyleChange,
		chatName,
		onChatNameChange: onTextInputChange(setChatName),
		onCreateChatClick,
		isCreatingChat,
	};
};
