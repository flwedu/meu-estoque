import type { Metadata } from "next";
import { CategoriesTable } from "@/components/categories-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/queries/categories";

export const metadata: Metadata = {
	title: "Categorias | Meu Estoque",
	description: "Gerencie as categorias dos seus produtos",
};

/**
 * Página principal de categorias
 * @returns {Promise<JSX.Element>} Componente da página de categorias
 */
export default async function CategoriesPage() {
	const categories = await getCategories();

	return (
		<div className="flex flex-col gap-4 p-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Categorias</h1>
				<Link href="/categories/new">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Nova Categoria
					</Button>
				</Link>
			</div>
			<CategoriesTable categories={categories} />
		</div>
	);
}
