import { create } from "zustand";

interface ChatLoadState {
	isChatLoading: boolean;
	setIsChatLoading: (isChatLoading: boolean) => void;
}

export const useChatLoadStateStore = create<ChatLoadState>()((set) => ({
	isChatLoading: false,
	setIsChatLoading: (isChatLoading) => set({ isChatLoading }),
}));
