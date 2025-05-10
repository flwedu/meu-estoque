import prisma from "@/lib/prisma";

export async function getStockForProducts(take = 10) {
  return prisma.stock.findMany({
    take,
    include: {
      product: true,
    },
    orderBy: {
      product: {
        name: "asc",
      },
    },
  });
}
