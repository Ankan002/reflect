"use client";

import { DashboardProvider } from "@/components/providers";
import { useChatScreen } from "./hook";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Props {
	id: string;
}

const ChatScreen = (props: Props) => {
	const { id } = props;

	const { chat, isLoadingChat, onGeneratePrompt, onPromptChange, prompt } =
		useChatScreen({ id });

	return (
		<DashboardProvider
			heading={chat?.name ?? id}
			isHeadingLoading={isLoadingChat}
		>
			<div className="w-full flex-1 flex flex-col items-center px-5 pb-5">
				<div className="w-full max-w-[1000px] flex-1 flex flex-col">
					<div className="flex-1 flex w-full flex-col-reverse overflow-y-auto"></div>

					<div className="w-full flex items-end">
						<Textarea
							className="resize-none h-20 border-foreground"
							placeholder="Your imagination 🤯"
							value={prompt}
							onChange={onPromptChange}
						/>

						<Button
							className="ml-2"
							size="icon"
							onClick={onGeneratePrompt}
						>
							<Send />
						</Button>
					</div>
				</div>
			</div>
		</DashboardProvider>
	);
};

export default ChatScreen;
