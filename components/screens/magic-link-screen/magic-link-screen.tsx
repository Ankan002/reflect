"use client";

import { Logo } from "@/components/brand";
import { useMagicLinkScreen } from "./hook";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const MagicLinkScreen = () => {
	const { isNewAccount, name, onNameChange, onVerifyMagicLink } =
		useMagicLinkScreen();

	useEffect(() => {
		console.log(isNewAccount);
	}, [isNewAccount]);

	return (
		<main className="h-screen w-full flex flex-col bg-background font-quicksand">
			<div className="w-full flex items-center justify-start px-2 pt-2">
				<Logo type="long" />
			</div>

			<div className="flex-1 w-full flex flex-col items-center justify-center">
				<div className="w-full max-w-[400px] flex items-center justify-center">
					{!isNewAccount && (
						<div className="w-full flex items-center justify-center">
							<LoaderCircle
								className="text-primary animate-spin"
								size={30}
							/>
							<p className="ml-2 font-semibold text-xl text-foreground">
								Authenticating
							</p>
						</div>
					)}

					{isNewAccount && (
						<div className="w-full flex flex-col items-center justify-center">
							<div className="flex flex-col w-full mt-3">
								<Label
									htmlFor="name"
									className="text-foreground"
								>
									Your Name
								</Label>

								<Input
									id="name"
									type="text"
									placeholder="Jhon Doe"
									className="mt-1.5 text-foreground focus:ring-1 border-accent"
									value={name}
									onChange={onNameChange}
								/>
							</div>

							<Button
								className="w-full mt-5 items-center"
								onClick={onVerifyMagicLink}
							>
								Complete Details
							</Button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default MagicLinkScreen;
