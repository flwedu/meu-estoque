import type { Metadata } from "next";
import { CategoryForm } from "@/components/category-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
	params: {
		id: string;
	};
}

export const metadata: Metadata = {
	title: "Editar Categoria | Meu Estoque",
	description: "Edite uma categoria existente",
};

/**
 * Página de edição de categoria
 * @param {EditCategoryPageProps} props - Propriedades da página
 * @returns {Promise<JSX.Element>} Componente da página de edição de categoria
 */
export default async function EditCategoryPage({
	params,
}: EditCategoryPageProps) {
	const category = await prisma.category.findUnique({
		where: {
			id: params.id,
		},
	});

	if (!category) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-4 p-8">
			<h1 className="text-3xl font-bold">Editar Categoria</h1>
			<div className="max-w-2xl">
				<CategoryForm
					initialData={{
						name: category.name,
						icon: category.icon ?? undefined,
					}}
					categoryId={category.id}
				/>
			</div>
		</div>
	);
}
