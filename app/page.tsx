import { ThemeToggler } from "@/components/common";
import { DashboardProvider } from "@/components/providers";

export default function Home() {
	return (
		<div className="h-screen w-full flex flex-col items-center justify-center bg-background">
			<DashboardProvider>
				<></>
			</DashboardProvider>
			<ThemeToggler />
		</div>
	);
}
