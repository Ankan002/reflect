import { getAPIKeyAction, upsertAPIKeyAction } from "@/actions/api-key";
import { THEME_KEY } from "@/constants/env";
import { useAPIErrorHandler } from "@/hooks";
import { useThemeStore } from "@/store";
import { onTextInputChange } from "@/utils/client";
import { useEffect, useRef, useState } from "react";

export const useSettingsScreen = () => {
	const { setTheme, theme } = useThemeStore();

	const loadRef = useRef<boolean>(false);

	const [replicateApiKeyValue, setReplicateApiKeyValue] =
		useState<string>("");
	const [oldApiKey, setOldApiKey] = useState<string>("");
	const [isFetchingReplicateKey, setIsFetchingReplicateKey] =
		useState<boolean>(false);
	const [isSavingReplicateAPIKey, setIsSavingReplicateAPIKey] =
		useState<boolean>(false);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();

	const fetchReplicateApiKeyErrorHandler = protectedAPIErrorHandler();
	const deFocusReplicateKeyErrorHandler = protectedAPIErrorHandler();

	const onThemeChange = (value: string) => {
		if (value === "light") {
			setTheme("light");
			localStorage.setItem(THEME_KEY, "light");
		} else {
			setTheme("dark");
			localStorage.setItem(THEME_KEY, "dark");
		}
	};

	const onAPIKeyInputDeFocus = async () => {
		if (isSavingReplicateAPIKey) return;

		if (oldApiKey === replicateApiKeyValue) return;

		setIsSavingReplicateAPIKey(true);
		try {
			const response = await upsertAPIKeyAction({
				replicate_key: replicateApiKeyValue,
			});

			setIsSavingReplicateAPIKey(false);

			if (response.code === 401) {
				throw new Error("401");
			}

			if (!response.success) {
				setReplicateApiKeyValue(oldApiKey);
				throw new Error(response.error);
			}

			if (!response.data) {
				setReplicateApiKeyValue(oldApiKey);
				throw new Error("Something went wrong");
			}

			console.log(response);

			setOldApiKey(replicateApiKeyValue);
		} catch (error) {
			setIsSavingReplicateAPIKey(false);
			deFocusReplicateKeyErrorHandler(error);
		}
	};

	const fetchReplicateKey = async () => {
		if (isFetchingReplicateKey) return;

		setIsFetchingReplicateKey(true);

		try {
			const apiKeyResponse = await getAPIKeyAction();

			setIsFetchingReplicateKey(false);

			if (apiKeyResponse.code === 401) throw new Error("401");

			if (!apiKeyResponse.success) throw new Error(apiKeyResponse.error);

			if (apiKeyResponse.data && apiKeyResponse.data.api_key) {
				setReplicateApiKeyValue(apiKeyResponse.data.api_key.key);
				setOldApiKey(apiKeyResponse.data.api_key.key);
			}
		} catch (error) {
			setIsFetchingReplicateKey(false);
			fetchReplicateApiKeyErrorHandler(error);
		}
	};

	useEffect(() => {
		if (loadRef.current) return;

		loadRef.current = true;
		fetchReplicateKey();
	}, []);

	return {
		theme,
		onThemeChange,
		replicateApiKeyValue,
		onReplicateApiKeyValueChange: onTextInputChange(
			setReplicateApiKeyValue
		),
		isFetchingReplicateKey,
		onAPIKeyInputDeFocus,
		isSavingReplicateAPIKey
	};
};
