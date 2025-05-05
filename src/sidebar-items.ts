import { ArrowLeftRight, Boxes, Home, Package, Tag } from "lucide-react";

export const sidebarItems = [
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
		title: "Categorias",
		href: "/categories",
		icon: Tag,
	},
	{
		title: "Movimentações",
		href: "/movements",
		icon: ArrowLeftRight,
	},
	{
		title: "Estoque",
		href: "/stock",
		icon: Boxes,
	},
];
