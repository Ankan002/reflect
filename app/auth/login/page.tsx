import AuthCover from "@/assets/images/auth/auth-hero.jpg";
import { ThemeToggler } from "@/components/common";
import { LoginSection } from "@/components/login-page";
import Image from "next/image";

const LoginPage = () => {
	return (
		<main className="w-full min-h-screen bg-background flex font-body">
			<LoginSection />

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
