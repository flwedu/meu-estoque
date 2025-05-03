import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Package } from "lucide-react";

/**
 * Interface que representa um produto
 */
interface Product {
	id: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
}

/**
 * Página que exibe a lista de produtos cadastrados
 * @returns {JSX.Element} Página com tabela de produtos
 */
export default function ProductsPage() {
	// TODO: Buscar produtos do banco de dados
	const products: Product[] = [];

	return (
		<div className="space-y-6 p-6">
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
									<TableHead className="w-[30%]">Descrição</TableHead>
									<TableHead className="w-[15%] text-right">
										Quantidade
									</TableHead>
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
											<TableCell>{product.description}</TableCell>
											<TableCell className="text-right">
												{product.quantity}
											</TableCell>
											<TableCell className="text-right">
												{new Intl.NumberFormat("pt-BR", {
													style: "currency",
													currency: "BRL",
												}).format(product.price)}
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
