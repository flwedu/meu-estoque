import type { Metadata } from "next";
import { CategoryForm } from "@/components/category-form";

export const metadata: Metadata = {
	title: "Nova Categoria | Meu Estoque",
	description: "Crie uma nova categoria",
};

/**
 * Página de criação de nova categoria
 * @returns {JSX.Element} Componente da página de nova categoria
 */
export default function NewCategoryPage() {
	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-3xl font-bold">Nova Categoria</h1>
			<div className="max-w-2xl">
				<CategoryForm />
			</div>
		</div>
	);
}
