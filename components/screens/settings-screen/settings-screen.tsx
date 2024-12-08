"use client";

import { DashboardProvider } from "@/components/providers";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { useSettingsScreen } from "./hook";

const SettingsScreen = () => {
	const { theme, onThemeChange } = useSettingsScreen();

	return (
		<DashboardProvider heading="Settings">
			<div className="w-full flex flex-col items-center font-geist-sans mt-5 text-primary">
				<div className="w-full max-w-[1000px] flex flex-col">
					<div className="flex flex-col w-full">
						<Label>Replicate API Key</Label>
						<Input className="mt-2 border-foreground" />
					</div>
					<div className="w-full flex items-center justify-between mt-5">
						<p className="text-lg">Theme</p>

						<Select value={theme} onValueChange={onThemeChange}>
							<SelectTrigger className="w-[180px] outline-none focus:outline-none focus:ring-0 border border-foreground">
								<SelectValue placeholder="Theme" />
							</SelectTrigger>
							<SelectContent className={`${theme} bg-background`}>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</DashboardProvider>
	);
};

export default SettingsScreen;
