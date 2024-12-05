import { verifyMagicLink } from "@/actions/auth";
import { useAPIErrorHandler } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import { useAuthStateStore } from "@/store";
import { onTextInputChange } from "@/utils/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useMagicLinkScreen = () => {
	const pathParams = useSearchParams();
	const router = useRouter();

	const loadRef = useRef<boolean>(false);

	const { setIsAuthenticated } = useAuthStateStore();

	const [magicToken, setMagicToken] = useState<string>("");
	const [isNewAccount, setIsNewAccount] = useState<boolean | null>(null);
	const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
	const [name, setName] = useState<string>("");

	const { APIErrorHandler } = useAPIErrorHandler();

	const { toast } = useToast();

	const verifyMagicLinkErrorHandler = APIErrorHandler();

	const onVerifyMagicLink = async () => {
		if (isCreatingAccount) {
			toast({
				title: "Creating account, hold on!",
				variant: "destructive",
			});
			return;
		}

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

			setIsCreatingAccount(true);

			const response = await verifyMagicLink(payload);

			if (!response.success) {
				throw new Error(response.error);
			}

			setIsCreatingAccount(false);

			setIsAuthenticated(true);
			router.replace("/");
			toast({
				title: "Logged in successfully!",
			});
		} catch (error) {
			setIsCreatingAccount(false);
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
				pathParams.get("new-account") === "true" ? true : false
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
