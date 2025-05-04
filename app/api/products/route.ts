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
				categories: {
					create: body.categoryIds.map((categoryId: string) => ({
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
						ProductCategory: {
							select: {
								category: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Erro ao criar produto", details: error },
			{ status: 500 },
		);
	}
}

/**
 * Função que busca todos os produtos
 * @param {Request} request - Requisição HTTP
 * @returns {Promise<NextResponse>} Resposta HTTP
 */
export async function GET(request: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const name = searchParams.get("name");

		const products = await prisma.product.findMany({
			where: name
				? {
						name: {
							contains: name,
							mode: "insensitive",
						},
					}
				: undefined,
			include: {
				images: true,
				categories: {
					include: {
						ProductCategory: {
							select: {
								category: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
			orderBy: {
				name: "asc",
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao buscar produtos" },
			{ status: 500 },
		);
	}
}
