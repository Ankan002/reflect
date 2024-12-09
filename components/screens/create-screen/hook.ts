import { createImageChatAction } from "@/actions/image-chat";
import { useAPIErrorHandler } from "@/hooks";
import { useImageChatsStateStore, useThemeStore } from "@/store";
import { OutputAspectRatio } from "@/types/common";
import { onTextInputChange } from "@/utils/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OutputFormatOptions = [
	{
		label: "PNG",
		value: "png",
	},
	{
		label: "WEBP",
		value: "webp",
	},
];

const NumberOfOutputOptions = [
	{
		label: "1",
		value: "1",
	},
	{
		label: "2",
		value: "2",
	},
	{
		label: "3",
		value: "3",
	},
	{
		label: "4",
		value: "4",
	},
];

const AspectRatioOptions = [
	{
		label: "1:1",
		value: "1:1",
	},
	{
		label: "16:9",
		value: "16:9",
	},
	{
		label: "21:9",
		value: "21:9",
	},
	{
		label: "3:2",
		value: "3:2",
	},
	{
		label: "2:3",
		value: "2:3",
	},
	{
		label: "4:5",
		value: "4:5",
	},
	{
		label: "5:4",
		value: "5:4",
	},
	{
		label: "3:4",
		value: "3:4",
	},
	{
		label: "4:3",
		value: "4:3",
	},
	{
		label: "9:16",
		value: "9:16",
	},
	{
		label: "9:21",
		value: "9:21",
	},
];

export const useCreateScreen = () => {
	const { theme } = useThemeStore();

	const router = useRouter();

	const [chatName, setChatName] = useState<string>("");
	const [outputFormat, setOutputFormat] = useState<string>("png");
	const [numberOfOutputs, setNumberOfOutputs] = useState<string>("4");
	const [aspectRatio, setAspectRatio] = useState<string>("1:1");

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
				number_of_output: Number(numberOfOutputs),
				output_format: outputFormat as "png" | "webp",
				aspect_ratio: aspectRatio as OutputAspectRatio,
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

	const onOutputFormatChange = (value: string) => {
		setOutputFormat(value);
	};

	const onNumberOfOutputsChange = (value: string) => {
		setNumberOfOutputs(value);
	};

	const onAspectRatioChange = (value: string) => {
		setAspectRatio(value);
	};

	return {
		theme,
		OutputFormatOptions,
		outputFormat,
		onOutputFormatChange,
		NumberOfOutputOptions,
		numberOfOutputs,
		onNumberOfOutputsChange,
		AspectRatioOptions,
		aspectRatio,
		onAspectRatioChange,
		chatName,
		onChatNameChange: onTextInputChange(setChatName),
		onCreateChatClick,
		isCreatingChat,
	};
};
