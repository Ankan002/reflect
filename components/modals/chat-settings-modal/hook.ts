import { updateImageChatConfigAction } from "@/actions/image-chat";
import { useAPIErrorHandler } from "@/hooks";
import { useThemeStore } from "@/store";
import { toggleBooleanState } from "@/utils/client";
import { chat_config } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
	const [isUpdatingSettings, setIsUpdatingSetiings] =
		useState<boolean>(false);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();

	const updateSettingsErrorHandler = protectedAPIErrorHandler();

	const onImageStyleChange = (value: string) => {
		setImageStyle(value as "natural" | "vivid");
	};

	const onClose = () => {
		setImageStyle(args.chatConfig.image_style);
		setPickContext(args.chatConfig.use_context);
		args.onCloseClick();
	};

	const onSaveClick = async () => {
		if (isUpdatingSettings) {
			toast.error("Updating the settings hold on!");
			return;
		}

		setIsUpdatingSetiings(true);

		try {
			const response = await updateImageChatConfigAction({
				chat_id: args.chatId,
				image_style: imageStyle,
				use_context: pickContext,
			});

			setIsUpdatingSetiings(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				throw new Error(response.error);
			}

			if (!response.data) {
				throw new Error("Something went wrong");
			}

			console.log(response.data.chat_config);

			args.onUpdate(response.data.chat_config);
			toast.success("Config updated!");
			onClose();
		} catch (error) {
			setIsUpdatingSetiings(false);

			updateSettingsErrorHandler(error);
		}
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
		isUpdatingSettings,
		onSaveClick,
	};
};
