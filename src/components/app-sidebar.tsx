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
import type { SidebarItem } from "@/sidebar-items";
import Link from "next/link";

type AppSidebarProps = {
	items: SidebarItem[];
};

export function AppSidebar({ items }: AppSidebarProps) {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Meu Estoque</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								if (item.children) {
									return (
										<SidebarGroup key={item.href}>
											<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
											<SidebarGroupContent>
												{item.children.map((child) => (
													<SidebarMenuItem key={child.href}>
														<SidebarMenuButton asChild>
															<Link href={child.href}>
																<child.icon />
																<span>{child.title}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
											</SidebarGroupContent>
										</SidebarGroup>
									);
								}
								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton asChild>
											<Link href={item.href}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
