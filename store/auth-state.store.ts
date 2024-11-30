import { create } from "zustand";

interface AuthStateStore {
	isAuthenticated: boolean;
	setIsAuthenticated: (newState: boolean) => void;
}

export const useAuthStateStore = create<AuthStateStore>()((set) => ({
	isAuthenticated: false,
	setIsAuthenticated: (newState) =>
		set(() => ({
			isAuthenticated: newState,
		})),
}));
