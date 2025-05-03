import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Meu Estoque",
	description: "Sistema de gerenciamento de estoque",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<SidebarProvider>
					<AppSidebar />
					<main>
						<SidebarTrigger />
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
