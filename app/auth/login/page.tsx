import AuthCover from "@/assets/images/auth/auth-hero.jpg";
import { ThemeToggler } from "@/components/common";
import Image from "next/image";

const LoginPage = () => {
	return (
		<main className="w-full min-h-screen bg-background flex font-geist-sans">
			<div className="flex-1 flex flex-col"></div>

			<div className="md:w-1/2 h-screen hidden md:flex flex-col">
				<Image
					src={AuthCover.src}
					height={AuthCover.height}
					width={AuthCover.width}
					alt="Auth Cover Image"
					className="w-full h-full object-cover rounded-l-lg"
				/>
			</div>
			<ThemeToggler />
		</main>
	);
};

export default LoginPage;
