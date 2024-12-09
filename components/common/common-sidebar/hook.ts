import { useChatLoadStateStore, useImageChatsStateStore } from "@/store";

export const useCommonSidebar = () => {
	const { isChatLoading } = useChatLoadStateStore();
	const { chats } = useImageChatsStateStore();

	return {
		isChatLoading,
		chats,
	};
};
