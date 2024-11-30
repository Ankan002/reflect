"use client";

import { Logo } from "@/components/brand";
import { useLoginSection } from "./hook";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoginSection = () => {
	const { email, onEmailChange, onLoginClickHandler, isLoading } =
		useLoginSection();

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

					<div className="text-base font-medium text-muted-foreground tracking-wide w-full font-quicksand mt-5">
						{"Let's"} have a final check on your authenticity before
						getting back to your artistic gallery.
					</div>

					<div className="w-full mt-5">
						<div className="flex flex-col w-full mt-3">
							<Label htmlFor="email" className="text-foreground">
								Email
							</Label>

							<Input
								id="email"
								type="email"
								placeholder="abc@gmail.com"
								className="mt-1.5 text-foreground focus:ring-1"
								value={email}
								onChange={onEmailChange}
							/>
						</div>
					</div>

					<Button
						className="w-full mt-5 items-center"
						onClick={onLoginClickHandler}
						disabled={isLoading}
					>
						{isLoading && (
							<Loader2 className="text-primary-foreground animate-spin" />
						)}
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginSection;
