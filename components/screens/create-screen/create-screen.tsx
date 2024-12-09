"use client";

import { DashboardProvider } from "@/components/providers";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Settings2 } from "lucide-react";
import { useCreateScreen } from "./hook";

const CreateScreen = () => {
	const {
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
	} = useCreateScreen();

	return (
		<DashboardProvider heading="New Chat">
			<main className="w-full flex-1 flex flex-col px-5 items-center justify-center mt-5 font-geist-sans text-foreground">
				<div className="w-full max-w-[800px] flex flex-col">
					<p className="flex items-center justify-center text-center text-3xl font-medium text-primary">
						{"Let's"} generate something awesome
					</p>

					<div className="flex flex-col w-full mt-5">
						<Label>Chat Name</Label>
						<Input
							className="w-full mt-2 border-foreground"
							placeholder="Domino Potato"
						/>
					</div>

					<Accordion type="single" collapsible className="mt-3">
						<AccordionItem value="item-1" className="border-0">
							<AccordionTrigger className="font-medium no-underline">
								<div className="w-full flex">
									<Settings2 className="mr-2" />
									Advanced Settings
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="w-full flex items-center justify-between">
									<p className="text-lg">Output Format</p>

									<Select
										value={outputFormat}
										onValueChange={onOutputFormatChange}
									>
										<SelectTrigger className="w-[180px] outline-none focus:outline-none focus:ring-0 border border-foreground">
											<SelectValue placeholder="Format" />
										</SelectTrigger>
										<SelectContent
											className={`${theme} bg-background`}
										>
											{OutputFormatOptions.map(
												(option) => (
													<SelectItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</div>

								<div className="w-full flex items-center justify-between mt-4">
									<p className="text-lg">Number of Outputs</p>

									<Select
										value={numberOfOutputs}
										onValueChange={onNumberOfOutputsChange}
									>
										<SelectTrigger className="w-[180px] outline-none focus:outline-none focus:ring-0 border border-foreground">
											<SelectValue placeholder="Outputs" />
										</SelectTrigger>
										<SelectContent
											className={`${theme} bg-background`}
										>
											{NumberOfOutputOptions.map(
												(option) => (
													<SelectItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</div>

								<div className="w-full flex items-center justify-between mt-4">
									<p className="text-lg">
										Output Aspect Ratio
									</p>

									<Select
										value={aspectRatio}
										onValueChange={onAspectRatioChange}
									>
										<SelectTrigger className="w-[180px] outline-none focus:outline-none focus:ring-0 border border-foreground">
											<SelectValue placeholder="Outputs" />
										</SelectTrigger>
										<SelectContent
											className={`${theme} bg-background`}
										>
											{AspectRatioOptions.map(
												(option) => (
													<SelectItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<div className="w-full mt-3 flex justify-end">
						<Button>Create</Button>
					</div>
				</div>
			</main>
		</DashboardProvider>
	);
};

export default CreateScreen;
