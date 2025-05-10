import prisma from "@/lib/prisma";

type ProductOrderBy = Prisma.ProductOrderByWithRelationInput;

export async function getProducts(
	take = 10,
	orderBy: ProductOrderBy = { name: "asc" },
) {
  return prisma.product.findMany({
    take,
    orderBy,
    include: {
      images: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}

export async function getProductsCount() {
  return prisma.product.count();
}
