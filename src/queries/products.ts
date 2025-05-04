import prisma from "@/lib/prisma";

export async function getProducts() {
	const products = await prisma.product.findMany();
	return products;
}

export async function getProductsWithStock() {
	const products = await prisma.product.findMany({
		where: {
			Movement: { some: { quantity: { gt: 0 } } },
		},
	});
	return products;
}

export async function getProductsCount() {
	const products = await prisma.product.count();
	return products;
}
