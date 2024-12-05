import { create } from "zustand";

interface UserLoadStore {
	isUserLoading: boolean;
	setIsUserLoading: (newState: boolean) => void;
}

export const useUserLoadStore = create<UserLoadStore>()((set) => ({
	isUserLoading: false,
	setIsUserLoading: (newState) =>
		set((prev) => ({
			...prev,
			isUserLoading: newState,
		})),
}));
