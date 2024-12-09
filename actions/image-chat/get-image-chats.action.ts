"use server";

import {
	actionHandler,
	getPrismaClient,
	verifyAuthToken,
} from "@/utils/server";
import { image_gen_chat } from "@prisma/client";

interface Response {
	chats: Array<Pick<image_gen_chat, "id" | "name">>;
}

export const getImageChatsAction = actionHandler<Response>(async () => {
	const { id } = await verifyAuthToken();

	const prisma = getPrismaClient();

	const chats = await prisma.image_gen_chat.findMany({
		where: {
			user_id: id,
		},
		select: {
			id: true,
			name: true,
		},
		orderBy: {
			created_at: "desc",
		},
	});

	return {
		success: true,
		code: 200,
		data: {
			chats,
		},
	};
});
