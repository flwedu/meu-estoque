import prisma from "@/lib/prisma";
import { QueryError } from "@/lib/error";
/**
 * Busca todas as categorias ordenadas por nome
 * @returns {Promise<Array>} Lista de categorias
 */
export async function getCategories() {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				name: "asc",
			},
		});

		return categories;
	} catch (error) {
		console.error("Erro ao buscar categorias:", error);
		throw new QueryError("Erro ao buscar categorias", error);
	}
}
