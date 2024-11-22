import { THEME_KEY } from "@/constants/env";
import { useThemeStore } from "@/store";
import { useEffect, useRef } from "react";

export const useThemeProvider = () => {
	const { theme, setTheme } = useThemeStore();
	const isAppMounted = useRef<boolean>(false);

	const loadAppTheme = () => {
		const prevSavedTheme = localStorage.getItem(THEME_KEY);

		if (
			!prevSavedTheme ||
			(prevSavedTheme !== "light" && prevSavedTheme !== "dark")
		) {
			localStorage.setItem(THEME_KEY, "light");
			return;
		}

		setTheme(prevSavedTheme);
	};

	useEffect(() => {
		if (isAppMounted.current) return;

		isAppMounted.current = true;
		loadAppTheme();
	}, []);

	return {
		theme,
	};
};
