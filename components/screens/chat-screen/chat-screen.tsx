"use client";

import { DashboardProvider } from "@/components/providers";
import { useChatScreen } from "./hook";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

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
	} = useChatScreen({ id });

	return (
		<DashboardProvider
			heading={chat?.name ?? id}
			isHeadingLoading={isLoadingChat}
		>
			<div className="w-full flex-1 flex flex-col items-center px-5 pb-5 font-geist-sans text-primary">
				<div className="w-full max-w-[1000px] max-h-[90vh] flex-1 flex flex-col">
					<div className="flex-1 flex w-full flex-col-reverse overflow-y-auto">
						{messages.map((message) => (
							<div
								key={message.id}
								className={twMerge(
									"w-full flex my-2",
									message.role === "user"
										? "justify-end"
										: "justify-start"
								)}
							>
								{message.role === "user" && (
									<div className="w-full max-w-[400px] bg-primary text-primary-foreground p-2 rounded-lg">
										{message.prompt}
									</div>
								)}

								{message.role === "system" && (
									<div className="w-full max-w-[450px] flex flex-wrap">
										{message.images!.map((image) => (
											<Image
												key={image.id}
												src={image.asset_url}
												alt={image.id}
												height={
													(200 /
														Number(
															image.aspect_ratio.split(
																":"
															)[0]
														)) *
													Number(
														image.aspect_ratio.split(
															":"
														)[1]
													)
												}
												width={200}
												className="m-1 rounded-md"
												style={{
													aspectRatio:
														image.aspect_ratio,
												}}
											/>
										))}
									</div>
								)}
							</div>
						))}
					</div>

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
