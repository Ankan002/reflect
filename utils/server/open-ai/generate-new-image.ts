import { getOpenAiClient } from "./get-open-ai-client";

interface Args {
	prompt: string;
	style: "vivid" | "natural";
	numberOfOutput: number;
	admin: boolean;
	apiKey?: string;
}

type ResponseData = string[];

export const generateNewImage = async (args: Args): Promise<ResponseData> => {
	const openAi = args.admin
		? getOpenAiClient({
				admin: args.admin,
			})
		: getOpenAiClient({
				apiKey: args.apiKey ?? "",
				admin: false,
			});

	const imagesResponse = await openAi.images.generate({
		prompt: args.prompt,
		model: "dall-e-3",
		style: args.style ?? "vivid",
		n: 1,
		quality: "hd",
		size: "1024x1024",
		response_format: "url",
	});

	console.log(imagesResponse);

	const images = imagesResponse.data.map((response) => response.url ?? "");

	return images;
};
