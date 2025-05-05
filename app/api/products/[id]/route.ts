import prisma from "@/lib/prisma";
import type { ProductFormOutput } from "@/schemas/product";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Função que atualiza um produto
 * @param {Request} request - Requisição HTTP
 * @param {Object} params - Parâmetros da rota
 * @returns {Promise<NextResponse>} Resposta HTTP com o produto atualizado
 */
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const body = (await request.json()) as ProductFormOutput;

		// Primeiro, remove todas as categorias existentes
		await prisma.productCategory.deleteMany({
			where: {
				productId: params.id,
			},
		});

		// Depois, atualiza o produto e cria as novas categorias
		const product = await prisma.product.update({
			where: {
				id: params.id,
			},
			data: {
				name: body.name,
				price: body.price,
				categories: {
					create: body.categoryIds.map((categoryId) => ({
						category: {
							connect: {
								id: categoryId,
							},
						},
					})),
				},
			},
			include: {
				images: true,
				categories: {
					include: {
						category: true,
					},
				},
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

/**
 * Função que remove um produto
 * @param {Request} request - Requisição HTTP
 * @param {Object} params - Parâmetros da rota
 * @returns {Promise<NextResponse>} Resposta HTTP
 */
export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		await prisma.product.delete({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao remover produto" },
			{ status: 500 },
		);
	}
}
