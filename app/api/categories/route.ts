import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Função que retorna todas as categorias
 * @returns {Promise<NextResponse>} Resposta HTTP com as categorias
 */
export async function GET(): Promise<NextResponse> {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				name: "asc",
			},
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao buscar categorias" },
			{ status: 500 },
		);
	}
}
