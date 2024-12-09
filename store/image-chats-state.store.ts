import { image_gen_chat } from "@prisma/client";
import { create } from "zustand";

interface ImageChatsStore {
	chats: Pick<image_gen_chat, "id" | "name">[];
	setChats: (newChats: Pick<image_gen_chat, "id" | "name">[]) => void;
	addChat: (newChat: Pick<image_gen_chat, "id" | "name">) => void;
	removeChat: (chatId: string) => void;
}

export const useImageChatsStateStore = create<ImageChatsStore>()((set) => ({
	chats: [],
	setChats: (newChats) => set({ chats: newChats }),
	addChat: (newChat) =>
		set((state) => ({ chats: [newChat, ...state.chats] })),
	removeChat: (chatId) =>
		set((state) => ({
			chats: state.chats.filter((chat) => chat.id !== chatId),
		})),
}));
