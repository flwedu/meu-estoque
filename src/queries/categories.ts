import prisma from "@/lib/prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany()
  return categories
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({ where: { id } })
  return category
}
