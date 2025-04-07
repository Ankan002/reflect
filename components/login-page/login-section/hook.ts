import { getMagicLink } from "@/actions/auth";
import { useAPIErrorHandler } from "@/hooks";
import { onTextInputChange } from "@/utils/client";
import { useState } from "react";
import { toast } from "sonner";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { APIErrorHandler } = useAPIErrorHandler();
	const loginErrorHandler = APIErrorHandler();

	const onLoginClickHandler = async () => {
		if (isLoading) {
			toast.error("Loading");
			return;
		}

		setIsLoading(true);

		try {
			const res = await getMagicLink({
				email,
			});

			setIsLoading(false);

			console.log(res);

			toast.success("Email Sent!");
		} catch (error) {
			setIsLoading(false);

			loginErrorHandler(error);
		}
	};

	return {
		email,
		onEmailChange: onTextInputChange(setEmail),
		onLoginClickHandler,
		isLoading,
	};
};
