"use client";

import { DashboardProvider } from "@/components/providers";

const CreateScreen = () => {
	return (
		<DashboardProvider heading="New Chat">
			<main className="w-full min-h-screen bg-background flex flex-col px-2"></main>
		</DashboardProvider>
	);
};

export default CreateScreen;
