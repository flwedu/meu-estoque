import {
	ArrowLeftRight,
	Boxes,
	Home,
	Package,
	ShoppingCart,
	Tag,
	Truck,
	Users,
} from "lucide-react";

export type SidebarItem = {
	title: string;
	href: string;
	icon: React.ElementType;
	children?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [
	{
		title: "Dashboard",
		href: "/",
		icon: Home,
	},
	{
		title: "Produtos",
		href: "/products",
		icon: Package,
		children: [
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
		],
	},
	{
		title: "Estoque",
		href: "/stock",
		icon: Boxes,
		children: [
			{
				title: "Estoque",
				href: "/stock",
				icon: Boxes,
			},
			{
				title: "Pedidos",
				href: "/orders",
				icon: Truck,
			},
			{
				title: "Movimentações",
				href: "/movements",
				icon: ArrowLeftRight,
			},
		],
	},
	{
		title: "Vendas",
		href: "/sales",
		icon: ShoppingCart,
	},
	{
		title: "Clientes",
		href: "/customers",
		icon: Users,
	},
];
