"use client";

import { DashboardProvider } from "@/components/providers";
import { useChatScreen } from "./hook";

interface Props {
	id: string;
}

const ChatScreen = (props: Props) => {
	const { id } = props;

	const { chat, isLoadingChat } = useChatScreen({ id });

	return (
		<DashboardProvider
			heading={chat?.name ?? id}
			isHeadingLoading={isLoadingChat}
		>
			<></>
		</DashboardProvider>
	);
};

export default ChatScreen;
