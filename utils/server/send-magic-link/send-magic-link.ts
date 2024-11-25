"use server";

import { MAILING_DOMAIN } from "@/constants/env";
import { getResendClient } from "../get-resend-client";
import { NotionMagicLinkEmail } from "@/components/email-templates";

interface Args {
	magicLink: string;
	recipient: string;
}

export const sendMagicLink = async (args: Args) => {
	const resendClient = getResendClient();

	const response = await resendClient.emails.send({
		from: `reflect@${MAILING_DOMAIN}`,
		to: [args.recipient],
		subject: "Your one time login gateway",
		react: NotionMagicLinkEmail({
			loginCode: args.magicLink,
		}),
	});

	console.log(response);
};
