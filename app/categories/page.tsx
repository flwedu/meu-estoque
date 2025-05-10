import { CategoriesTable } from "@/components/categories-table";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/queries/categories";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categorias | Meu Estoque",
  description: "Gerencie as categorias dos seus produtos"
};

/**
 * Página principal de categorias
 * @returns {Promise<JSX.Element>} Componente da página de categorias
 */
export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="max-w-[150px] sm:max-w-[300px] font-bold text-3xl truncate">
          Categorias
        </h1>
        <Link href="/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}
