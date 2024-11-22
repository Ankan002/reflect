import { Theme } from "@/types/common";
import { create } from "zustand";

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
	theme: "light" as Theme,
	setTheme: (theme) =>
		set(() => ({
			theme,
		})),
}));
