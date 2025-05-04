import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type ProductOrderBy = Prisma.ProductOrderByWithRelationInput;

export async function getProducts(
	take = 10,
	orderBy: ProductOrderBy = { name: "asc" },
) {
	const products = await prisma.product.findMany({
		take,
		orderBy,
		include: {
			images: true,
			categories: true,
		},
	});
	return products;
}

export async function getProductsCount() {
	const products = await prisma.product.count();
	return products;
}
