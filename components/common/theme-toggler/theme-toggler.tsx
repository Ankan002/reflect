"use client";

import { Button } from "@/components/ui/button";
import { useThemeToggler } from "./hook";
import { Moon, Sun } from "lucide-react";

const ThemeToggler = () => {
	const { theme, toggleTheme } = useThemeToggler();

	return (
		<Button
			variant="secondary"
			size="icon"
			onClick={toggleTheme}
			className="fixed bottom-3 right-3 rounded-xl"
			aria-label="Toggle theme button"
		>
			{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
		</Button>
	);
};

export default ThemeToggler;
