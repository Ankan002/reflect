"use server";

import { MAGIC_TOKEN_SECRET } from "@/constants/env";
import { MagicLinkTokenData } from "@/types/common";
import { APIError } from "@/types/error";
import { JwtPayload, verify } from "jsonwebtoken";

interface MagicTokenPayload extends JwtPayload {
	data?: MagicLinkTokenData;
}

export const verifyMagicToken = async (
	token: string,
): Promise<MagicLinkTokenData> => {
	const decryptedData = verify(
		token,
		MAGIC_TOKEN_SECRET,
	) as MagicTokenPayload;

	if (!decryptedData.data) {
		throw new APIError("No data found!", 401);
	}

	return decryptedData.data;
};
