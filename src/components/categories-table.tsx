"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Category } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { toast } from "sonner";

type CategoriesTableProps = {
	categories: Category[];
};

/**
 * Componente de tabela para exibir e gerenciar categorias
 * @returns {JSX.Element} Componente de tabela de categorias
 */
export function CategoriesTable({
	categories,
}: CategoriesTableProps): JSX.Element {
	const router = useRouter();

	/**
	 * Remove uma categoria
	 * @param {string} id - ID da categoria a ser removida
	 */
	const handleDelete = async (id: string) => {
		if (!confirm("Tem certeza que deseja remover esta categoria?")) return;

		try {
			const response = await fetch(`/api/categories/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error();

			toast.success("Categoria removida com sucesso");
			router.refresh();
		} catch (error) {
			toast.error("Erro ao remover categoria");
		}
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Ícone</TableHead>
						<TableHead className="w-[100px]">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.map((category) => (
						<TableRow key={category.id}>
							<TableCell>{category.name}</TableCell>
							<TableCell>{category.icon}</TableCell>
							<TableCell>
								<div className="flex gap-2">
									<Link href={`/categories/${category.id}/edit`}>
										<Button variant="ghost" size="icon">
											<Edit className="h-4 w-4" />
										</Button>
									</Link>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleDelete(category.id)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
