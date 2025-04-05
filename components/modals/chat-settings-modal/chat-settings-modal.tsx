import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { chat_config } from "@prisma/client";
import { useChatSettingsModal } from "./hook";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface Props {
	isOpen: boolean;
	onCloseClick: () => void;
	chatId: string;
	chatConfig: chat_config;
	onUpdate: (config: chat_config) => void;
}

const ChatSettingsModal = (props: Props) => {
	const { chatConfig, chatId, isOpen, onCloseClick, onUpdate } = props;

	const {
		theme,
		ImageStyleOptions,
		imageStyle,
		onImageStyleChange,
		onClose,
		pickContext,
		togglePickContext,
	} = useChatSettingsModal({
		chatConfig,
		chatId,
		onCloseClick,
		onUpdate,
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => (!open ? onClose() : null)}
		>
			<DialogContent className={`${theme} font-body text-foreground`}>
				<DialogHeader>
					<DialogTitle>Chat Settings</DialogTitle>
				</DialogHeader>

				<div className="w-full flex flex-col mt-3">
					<div className="w-full flex items-center justify-between">
						<p className="text-lg">Image Style</p>

						<Select
							value={imageStyle}
							onValueChange={onImageStyleChange}
						>
							<SelectTrigger className="w-[180px] outline-hidden focus:outline-hidden focus:ring-0 border border-foreground">
								<SelectValue placeholder="Format" />
							</SelectTrigger>
							<SelectContent
								className={`${theme} bg-background font-body`}
							>
								{ImageStyleOptions.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="w-full flex items-center justify-between mt-4">
						<p className="text-lg">Use Image Context</p>

						<Switch
							checked={pickContext}
							onCheckedChange={togglePickContext}
						/>
					</div>

					<div className="mt-5 flex justify-end items-center">
						<Button className="cursor-pointer">Save</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatSettingsModal;
