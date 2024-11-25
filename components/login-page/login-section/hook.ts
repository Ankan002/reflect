import { getMagicLink } from "@/actions/auth";
import { onTextInputChange } from "@/utils/client";
import { useState } from "react";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");

	const onLoginClickHandler = async () => {
		try {
			const response = await getMagicLink({
				email,
			});

			console.log(response);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				return;
			}

			console.log("Something went wrong!");
		}
	};

	return {
		email,
		onEmailChange: onTextInputChange(setEmail),
		onLoginClickHandler,
	};
};
