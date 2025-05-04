import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Função que registra uma nova movimentação de produto
 * @param {Request} request - Requisição HTTP
 * @returns {Promise<NextResponse>} Resposta HTTP
 */
export async function POST(request: Request): Promise<NextResponse> {
	try {
		const body = await request.json();

		// Inicia uma transação para garantir a consistência dos dados
		const result = await prisma.$transaction(async (tx) => {
			// Registra a movimentação
			const movement = await tx.movement.create({
				data: {
					productId: body.productId,
					quantity: body.quantity,
				},
			});

			// Atualiza ou cria o registro de estoque
			const stock = await tx.stock.upsert({
				where: {
					productId: body.productId,
				},
				create: {
					productId: body.productId,
					quantity: body.quantity,
				},
				update: {
					quantity: {
						increment: body.quantity,
					},
				},
			});

			return { movement, stock };
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao registrar movimentação" },
			{ status: 500 },
		);
	}
}
