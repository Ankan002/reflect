"use client";

import { Logo } from "@/components/brand";

const LoginSection = () => {
	return (
		<div className="flex-1 flex flex-col">
			<div className="w-full flex items-center px-3 py-2">
				<Logo type="long" />
			</div>

			<div className="w-full flex flex-col flex-1 items-center justify-center">
				<div className="w-full max-w-[500px] flex flex-col items-start">
					<div className="text-4xl text-primary font-semibold tracking-wide w-full font-quicksand">
						Welcome Back
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginSection;
