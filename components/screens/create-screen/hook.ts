import { useThemeStore } from "@/store";
import { useState } from "react";

const OutputFormatOptions = [
	{
		label: "PNG",
		value: "png",
	},
	{
		label: "WEBP",
		value: "webp",
	},
];

const NumberOfOutputOptions = [
	{
		label: "1",
		value: "1",
	},
	{
		label: "2",
		value: "2",
	},
	{
		label: "3",
		value: "3",
	},
	{
		label: "4",
		value: "4",
	},
];

const AspectRatioOptions = [
	{
		label: "1:1",
		value: "1:1",
	},
	{
		label: "16:9",
		value: "16:9",
	},
	{
		label: "21:9",
		value: "21:9",
	},
	{
		label: "3:2",
		value: "3:2",
	},
	{
		label: "2:3",
		value: "2:3",
	},
	{
		label: "4:5",
		value: "4:5",
	},
	{
		label: "5:4",
		value: "5:4",
	},
	{
		label: "3:4",
		value: "3:4",
	},
	{
		label: "4:3",
		value: "4:3",
	},
	{
		label: "9:16",
		value: "9:16",
	},
	{
		label: "9:21",
		value: "9:21",
	},
];

export const useCreateScreen = () => {
	const { theme } = useThemeStore();

	const [outputFormat, setOutputFormat] = useState<string>("png");
	const [numberOfOutputs, setNumberOfOutputs] = useState<string>("4");
	const [aspectRatio, setAspectRatio] = useState<string>("1:1");

	const onOutputFormatChange = (value: string) => {
		setOutputFormat(value);
	};

	const onNumberOfOutputsChange = (value: string) => {
		setNumberOfOutputs(value);
	};

	const onAspectRatioChange = (value: string) => {
		setAspectRatio(value);
	};

	return {
		theme,
		OutputFormatOptions,
		outputFormat,
		onOutputFormatChange,
		NumberOfOutputOptions,
		numberOfOutputs,
		onNumberOfOutputsChange,
		AspectRatioOptions,
		aspectRatio,
		onAspectRatioChange,
	};
};
