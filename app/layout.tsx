import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import type { JSX } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { sidebarItems } from "@/sidebar-items";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Meu Estoque",
	description: "Sistema de gerenciamento de estoque",
};

/**
 * Layout principal da aplicação
 * @param props - Propriedades do layout
 * @returns {JSX.Element} Layout com sidebar e provedor de temas
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					<SidebarProvider>
						<div className="flex w-full min-h-screen">
							<AppSidebar items={sidebarItems} />
							<main className="flex-1">
								<div className="flex items-center gap-4 px-4 border-b h-14 lg:h-[60px]">
									<SidebarTrigger />
									<div className="flex items-center gap-4 ml-auto">
										<ThemeToggle />
									</div>
								</div>
								{children}
							</main>
						</div>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
