import { THEME_KEY } from "@/constants/env";
import { useThemeStore } from "@/store";

export const useThemeToggler = () => {
	const { theme, setTheme } = useThemeStore();

	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
			localStorage.setItem(THEME_KEY, "light");
		} else {
			setTheme("dark");
			localStorage.setItem(THEME_KEY, "dark");
		}
	};

	return {
		toggleTheme,
		theme,
	};
};
