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

/**
 * Função que busca todos os produtos
 * @param {Request} request - Requisição HTTP
 * @returns {Promise<NextResponse>} Resposta HTTP
 */
export async function GET(request: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const name = searchParams.get("name") ?? "";

		if (!name) {
			const products = await prisma.product.findMany({
				take: 10,
				orderBy: {
					name: "asc",
				},
				select: {
					id: true,
					name: true,
				},
			});
			return NextResponse.json(products);
		}

		const products = await prisma.product.findMany({
			where: {
				name: { contains: name, mode: "insensitive" },
			},
			take: 10,
			orderBy: {
				name: "asc",
			},
			select: {
				id: true,
				name: true,
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
