import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Função que cria um novo produto
 * @param {Request} request - Requisição HTTP
 * @returns {Promise<NextResponse>} Resposta HTTP
 */
export async function POST(request: Request): Promise<NextResponse> {
	try {
		const body = await request.json();

		const product = await prisma.product.create({
			data: {
				name: body.name,
				price: body.price,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao cadastrar produto" },
			{ status: 500 },
		);
	}
}
