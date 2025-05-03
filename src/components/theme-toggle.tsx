"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Componente que permite alternar entre os temas claro e escuro
 * @returns {JSX.Element} Botão para alternar o tema
 */
export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="relative hover:bg-accent p-2 rounded-md hover:text-accent-foreground"
		>
			<Sun className="absolute w-5 h-5 rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
			<Moon className="w-5 h-5 rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
			<span className="sr-only">Alternar tema</span>
		</button>
	);
}
