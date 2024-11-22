import { ThemeToggler } from "@/components/common";

export default function Home() {
	return (
		<div className="h-screen w-full flex flex-col items-center justify-center bg-background">
			<ThemeToggler />
		</div>
	);
}
