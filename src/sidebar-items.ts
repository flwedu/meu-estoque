import {
	ArrowLeftRight,
	Boxes,
	Home,
	Package,
	ShoppingCart,
	Tag,
	Truck,
	Users,
  List
} from "lucide-react";

export type SidebarItem = {
	title: string;
	href: string;
	icon?: React.ElementType;
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
				title: "Consultar",
				href: "/products",
				icon: List,
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
				title: "Consultar",
				href: "/stock",
				icon: List,
			},
			{
				title: "Movimentações",
				href: "/movements",
				icon: ArrowLeftRight,
			},
		],
	},
  {
    title: "Pedidos",
    href: "/orders",
    icon: Truck
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
