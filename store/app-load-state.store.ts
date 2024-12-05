import { create } from "zustand";

interface AppLoadStateStore {
	isAppLoaded: boolean;
	setIsAppLoaded: (newState: boolean) => void;
}

export const useAppLoadStateStore = create<AppLoadStateStore>()((set) => ({
	isAppLoaded: false,
	setIsAppLoaded: (newState) =>
		set(() => ({
			isAppLoaded: newState,
		})),
}));
