"use server";

import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { ai_image } from "@prisma/client";

interface Response {
	images: ai_image[];
}

export const getImagesAction = actionHandler<Response>(async () => {
	const { id } = await verifyAuthToken();

	const prisma = getPrismaClient();

	const images = await prisma.ai_image.findMany({
		where: {
			user_id: id,
		},
	});

	return {
		success: true,
		code: 200,
		data: {
			images,
		},
	};
});
