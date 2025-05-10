import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import type { SidebarItem } from "@/sidebar-items";
import Link from "next/link";

type AppSidebarProps = {
  items: SidebarItem[];
};

export function AppSidebar({ items }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-bold">Meu Estoque</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            if (item.children) {
              return (
                <SidebarGroup key={item.href}>
                  <SidebarGroupLabel className="p-0 text-sm font-normal gap-2">
                    {item.icon ? <item.icon /> : null}
                    <span>{item.title}</span>
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    {item.children.map((child) => (
                      <SidebarMenuButton asChild key={child.href}>
                        <Link href={child.href}>
                          {child.icon ? <child.icon /> : null}
                          <span>{child.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ))}
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            }
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    {item.icon ? <item.icon /> : null}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
