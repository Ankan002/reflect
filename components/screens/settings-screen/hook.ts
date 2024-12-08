import { THEME_KEY } from "@/constants/env";
import { useThemeStore } from "@/store";
import { onTextInputChange } from "@/utils/client";
import { useState } from "react";

export const useSettingsScreen = () => {
	const { setTheme, theme } = useThemeStore();

	const [replicateApiKeyValue, setReplicateApiKeyValue] =
		useState<string>("");

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
		replicateApiKeyValue,
		onReplicateApiKeyValueChange: onTextInputChange(
			setReplicateApiKeyValue
		),
	};
};
