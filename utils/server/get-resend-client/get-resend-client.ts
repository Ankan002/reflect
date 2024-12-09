import { RESEND_API_KEY } from "@/constants/env";
import { Resend } from "resend";

const Client = {
	client: new Resend(RESEND_API_KEY),
};

Object.freeze(Client);

export const getResendClient = () => Client.client;
