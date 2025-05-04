import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Função que atualiza um produto existente
 * @param {Request} request - Requisição HTTP
 * @param {{ params: { id: string } }} context - Contexto da requisição
 * @returns {Promise<NextResponse>} Resposta HTTP
 */
export async function PUT(
	request: Request,
	context: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const body = await request.json();

		const product = await prisma.product.update({
			where: {
				id: context.params.id,
			},
			data: {
				name: body.name,
				price: body.price,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao atualizar produto" },
			{ status: 500 },
		);
	}
}
