import { DashboardProvider } from "@/components/providers";

export default function Home() {
	return (
		<>
			<DashboardProvider heading="New Chat">
				<main className="w-full min-h-screen bg-background flex flex-col px-2">
					{/* <p>Home</p> */}
				</main>
			</DashboardProvider>
		</>
	);
}
