import { verifyMagicLink } from "@/actions/auth";
import { useAPIErrorHandler } from "@/hooks";
import { onTextInputChange } from "@/utils/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useMagicLinkScreen = () => {
	const pathParams = useSearchParams();

	const loadRef = useRef<boolean>(false);

	const [magicToken, setMagicToken] = useState<string>("");
	const [isNewAccount, setIsNewAccount] = useState<boolean | null>(null);
	const [name, setName] = useState<string>("");

	const { APIErrorHandler } = useAPIErrorHandler();

	const verifyMagicLinkErrorHandler = APIErrorHandler();

	const onVerifyMagicLink = async () => {
		try {
			const payload: {
				token: string;
				name?: string;
			} = {
				token: magicToken,
			};

			if (name) {
				payload["name"] = name;
			}

			const response = await verifyMagicLink(payload);

			console.log(response);
		} catch (error) {
			verifyMagicLinkErrorHandler(error);
		}
	};

	useEffect(() => {
		loadRef.current = true;

		if (pathParams.get("token")) {
			setMagicToken(pathParams.get("token") ?? "");
		}

		if (
			pathParams.get("new-account") === "true" ||
			pathParams.get("new-account") === "false"
		) {
			setIsNewAccount(
				pathParams.get("new-account") === "true" ? true : false,
			);
		}
	}, [pathParams]);

	useEffect(() => {
		if (magicToken && isNewAccount !== null && loadRef.current) {
			onVerifyMagicLink();
		}
	}, [magicToken, isNewAccount, loadRef]);

	return {
		isNewAccount,
		name,
		onNameChange: onTextInputChange(setName),
		onVerifyMagicLink,
	};
};
