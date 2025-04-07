import { useThemeStore } from "@/store";
import { toggleBooleanState } from "@/utils/client";
import { chat_config } from "@prisma/client";
import { useEffect, useState } from "react";

interface Args {
	onCloseClick: () => void;
	chatId: string;
	chatConfig: chat_config;
	onUpdate: (config: chat_config) => void;
}

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

export const useChatSettingsModal = (args: Args) => {
	const { theme } = useThemeStore();

	const [imageStyle, setImageStyle] = useState(args.chatConfig.image_style);
	const [pickContext, setPickContext] = useState(args.chatConfig.use_context);

	const onImageStyleChange = (value: string) => {
		setImageStyle(value as "natural" | "vivid");
	};

	const onClose = () => {
		setImageStyle(args.chatConfig.image_style);
		setPickContext(args.chatConfig.use_context);
		args.onCloseClick();
	};

	useEffect(() => {
		setPickContext(args.chatConfig.use_context);
	}, [args.chatConfig]);

	return {
		theme,
		imageStyle,
		onImageStyleChange,
		ImageStyleOptions,
		pickContext,
		togglePickContext: toggleBooleanState(setPickContext),
		onClose,
	};
};
