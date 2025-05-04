import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { Package } from "lucide-react";
import type { JSX } from "react";

/**
 * Página que exibe a lista de produtos cadastrados
 * @returns {JSX.Element} Página com tabela de produtos
 */
export default async function ProductsPage(): Promise<JSX.Element> {
	const products = await prisma.product.findMany({
		include: {
			images: true,
		},
	});

	return (
		<div className="space-y-6 p-6 w-full">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Produtos</h1>
				<button
					type="button"
					className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-primary-foreground"
				>
					Novo Produto
				</button>
			</div>

			<Card className="w-full">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Package className="w-5 h-5" />
						Lista de Produtos
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="w-full overflow-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[30%]">Nome</TableHead>
									<TableHead className="w-[15%] text-right">Preço</TableHead>
									<TableHead className="w-[10%] text-right">Ações</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className="h-24 text-muted-foreground text-center"
										>
											Nenhum produto cadastrado
										</TableCell>
									</TableRow>
								) : (
									products.map((product) => (
										<TableRow key={product.id}>
											<TableCell className="font-medium">
												{product.name}
											</TableCell>
											<TableCell className="text-right">
												{new Intl.NumberFormat("pt-BR", {
													style: "currency",
													currency: "BRL",
												}).format(Number(product.price))}
											</TableCell>
											<TableCell className="text-right">
												<button
													type="button"
													className="text-primary hover:underline"
												>
													Editar
												</button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
