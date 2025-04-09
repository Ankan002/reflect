"use client";

import { DashboardProvider } from "@/components/providers";
import { useChatScreen } from "./hook";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Settings } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatSettingsModal } from "@/components/modals";
import { ImageCard } from "@/components/common";

interface Props {
	id: string;
}

const ChatScreen = (props: Props) => {
	const { id } = props;

	const {
		chat,
		isLoadingChat,
		onGeneratePrompt,
		onPromptChange,
		prompt,
		loadingMessages,
		messages,
		chatConfig,
		creatingImages,
		isSettingsModalOpen,
		toggleSettingsModal,
		onUpdateChatConfig,
	} = useChatScreen({ id });

	return (
		<DashboardProvider
			heading={chat?.name ?? id}
			isHeadingLoading={isLoadingChat}
			button
			ActionButtonIcon={Settings}
			onClick={chat && chatConfig ? toggleSettingsModal : () => {}}
		>
			<div className="w-full flex-1 flex flex-col items-center px-5 pb-5 font-body text-primary">
				<div className="w-full max-w-[1000px] max-h-[90vh] flex-1 flex flex-col">
					<div className="flex-1 flex w-full flex-col-reverse overflow-y-auto">
						{creatingImages && (
							<div className="w-full flex flex-col">
								<div className="w-full flex justify-end">
									<div className="w-full max-w-[400px] bg-primary text-primary-foreground p-2 rounded-lg mt-3 break-words text-wrap">
										{prompt}
									</div>
								</div>

								<div className="w-full max-w-[500px] flex flex-wrap mt-3">
									{new Array(
										chatConfig?.number_of_outputs ?? 1,
									)
										.fill(0)
										.map((_, index) => (
											<Skeleton
												key={index}
												className="m-1 rounded-md border border-primary w-64 h-64"
											/>
										))}
								</div>
							</div>
						)}

						{loadingMessages ? (
							<>
								{new Array(5).fill(0).map((_, index) => (
									<Skeleton
										key={index}
										className="w-full h-10 my-2"
									/>
								))}
							</>
						) : (
							<>
								{messages.map((message) => (
									<div
										key={message.id}
										className={twMerge(
											"w-full flex my-2",
											message.role === "user"
												? "justify-end"
												: "justify-start",
										)}
									>
										{message.role === "user" && (
											<div className="w-full max-w-[400px] bg-primary text-primary-foreground p-2 rounded-lg">
												{message.prompt}
											</div>
										)}

										{message.role === "system" && (
											<div className="w-full max-w-[500px] flex flex-wrap">
												{message.images!.map(
													(image) => (
														<ImageCard
															image={image}
															key={image.id}
														/>
													),
												)}
											</div>
										)}
									</div>
								))}
							</>
						)}
					</div>

					<div className="w-full flex items-end mt-3">
						<Textarea
							className="resize-none h-20 border-foreground"
							placeholder="Your imagination 🤯"
							value={creatingImages ? "" : prompt}
							onChange={onPromptChange}
						/>

						<Button
							className="ml-2"
							size="icon"
							onClick={onGeneratePrompt}
							disabled={creatingImages}
						>
							<Send />
						</Button>
					</div>
				</div>
			</div>

			{chat && chatConfig && isSettingsModalOpen && (
				<ChatSettingsModal
					onUpdate={onUpdateChatConfig}
					chatConfig={chatConfig}
					chatId={chat.id}
					isOpen={isSettingsModalOpen}
					onCloseClick={toggleSettingsModal}
				/>
			)}
		</DashboardProvider>
	);
};

export default ChatScreen;
