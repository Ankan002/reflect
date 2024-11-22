import { onTextInputChange } from "@/utils/client";
import { useState } from "react";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");

	return {
		email,
		onEmailChange: onTextInputChange(setEmail),
	};
};
