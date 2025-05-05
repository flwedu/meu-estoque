import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Obtém uma categoria específica
 * @param {Request} request - Requisição
 * @param {Object} params - Parâmetros da rota
 * @returns {Promise<NextResponse>} Categoria encontrada
 */
export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const category = await prisma.category.findUnique({
			where: {
				id: params.id,
			},
		});

		if (!category) {
			return NextResponse.json(
				{ error: "Categoria não encontrada" },
				{ status: 404 },
			);
		}

		return NextResponse.json(category);
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao buscar categoria" },
			{ status: 500 },
		);
	}
}

/**
 * Atualiza uma categoria específica
 * @param {Request} request - Requisição contendo os dados atualizados
 * @param {Object} params - Parâmetros da rota
 * @returns {Promise<NextResponse>} Categoria atualizada
 */
export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const body = await request.json();
		const { name, icon } = body;

		if (!name) {
			return NextResponse.json(
				{ error: "Nome é obrigatório" },
				{ status: 400 },
			);
		}

		const category = await prisma.category.update({
			where: {
				id: params.id,
			},
			data: {
				name,
				icon,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao atualizar categoria" },
			{ status: 500 },
		);
	}
}

/**
 * Remove uma categoria específica
 * @param {Request} request - Requisição
 * @param {Object} params - Parâmetros da rota
 * @returns {Promise<NextResponse>} Status da operação
 */
export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await prisma.category.delete({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json({ message: "Categoria removida com sucesso" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao remover categoria" },
			{ status: 500 },
		);
	}
}
