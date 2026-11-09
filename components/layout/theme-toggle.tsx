"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Same storage key and `dark` class as the inline script in the root layout.
export function ThemeToggle() {
	const toggleTheme = () => {
		const dark = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", dark);
		try {
			localStorage.setItem("theme", dark ? "dark" : "light");
		} catch {
			// Storage can be blocked; the theme still applies for this visit.
		}
	};

	return (
		<Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme}>
			<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Alternar tema</span>
		</Button>
	);
}
