import { OPEN_AI_KEY } from "@/constants/env";
import OpenAI from "openai";
import { APIError } from "@/types/error";

type Args =
	| {
			admin: false;
			apiKey: string;
	  }
	| {
			admin: true;
	  };

const adminInstance = new OpenAI({
	apiKey: OPEN_AI_KEY,
});

// This MF can be replaced by timed redis instance but I am too lazy to do that 😉😂
const oldInstances: Record<string, OpenAI> = {};

export const getOpenAiClient = (args: Args) => {
	if (!args.admin && !args.apiKey) {
		throw new APIError("Please provide an API Key", 400);
	}

	if (args.admin) return adminInstance;

	if (oldInstances[args.apiKey]) return oldInstances[args.apiKey];

	const newInsatnce = new OpenAI({
		apiKey: args.apiKey,
	});

	oldInstances[args.apiKey] = newInsatnce;

	return newInsatnce;
};
