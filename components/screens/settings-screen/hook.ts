import { THEME_KEY } from "@/constants/env";
import { useThemeStore } from "@/store";

export const useSettingsScreen = () => {
	const { setTheme, theme } = useThemeStore();

	const onThemeChange = (value: string) => {
		if (value === "light") {
			setTheme("light");
			localStorage.setItem(THEME_KEY, "light");
		} else {
			setTheme("dark");
			localStorage.setItem(THEME_KEY, "dark");
		}
	};

	return {
		theme,
		onThemeChange,
	};
};
