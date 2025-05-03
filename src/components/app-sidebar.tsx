import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Boxes, Home, Package } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
	{
		title: "Dashboard",
		href: "/",
		icon: Home,
	},
	{
		title: "Produtos",
		href: "/products",
		icon: Package,
	},
	{
		title: "Movimentações",
		href: "/moviment",
		icon: Boxes,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Meu Estoque</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{sidebarItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton asChild>
										<Link href={item.href}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
