import { user } from "@prisma/client";
import { create } from "zustand";

interface UserStore {
	user: user | null;
	updateUser: (newUser: user | null) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
	user: null,
	updateUser: (newUser) =>
		set(() => ({
			user: newUser,
		})),
}));
