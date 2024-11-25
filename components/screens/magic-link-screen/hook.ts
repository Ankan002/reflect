import { onTextInputChange } from "@/utils/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useMagicLinkScreen = () => {
	const pathParams = useSearchParams();

	const loadRef = useRef<boolean>(false);

	const [magicToken, setMagicToken] = useState<string>("");
	const [isNewAccount, setIsNewAccount] = useState<boolean>(false);
	const [name, setName] = useState<string>("");

	useEffect(() => {
		loadRef.current = true;

		if (pathParams.get("token")) {
			setMagicToken(pathParams.get("token") ?? "");
		}

		if (
			Boolean(pathParams.get("new-account")) === true ||
			Boolean(pathParams.get("new-account")) === false
		) {
			setIsNewAccount(Boolean(pathParams.get("new-account")));
		}
	}, [pathParams]);

	useEffect(() => {
		if (magicToken && !isNewAccount && loadRef.current) {
			console.log("HERE");
		}
	}, [magicToken, isNewAccount, loadRef]);

	return {
		isNewAccount,
		name,
		onNameChange: onTextInputChange(setName),
	};
};
