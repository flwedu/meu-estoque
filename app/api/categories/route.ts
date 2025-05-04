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

/**
 * Cria uma nova categoria
 * @param {Request} request - Requisição contendo os dados da categoria
 * @returns {Promise<NextResponse>} Categoria criada
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, icon } = body;

		if (!name || !icon) {
			return NextResponse.json(
				{ error: "Nome e ícone são obrigatórios" },
				{ status: 400 }
			);
		}

		const category = await prisma.category.create({
			data: {
				name,
				icon,
			},
		});

		return NextResponse.json(category, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao criar categoria" },
			{ status: 500 }
		);
	}
}
