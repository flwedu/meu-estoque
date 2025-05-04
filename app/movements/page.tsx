import { MovementForm } from "@/components/movement-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getLastMovements } from "@/queries/movements";
import { getStockForProducts } from "@/queries/stock";
import { ArrowDownToLine, ArrowUpFromLine, Package } from "lucide-react";
import type { JSX } from "react";

/**
 * Página que exibe a lista de movimentações e estoque dos produtos
 * @returns {JSX.Element} Página com tabela de movimentações e estoque
 */
export default async function MovementsPage(): Promise<JSX.Element> {
	const [movements, stock] = await Promise.all([
		getLastMovements(10),
		getStockForProducts(10),
	]);

	return (
		<div className="space-y-6 p-6 w-full">
			<div className="flex justify-between items-center">
				<h1 className="max-w-[150px] sm:max-w-[300px] font-bold text-3xl truncate">
					Movimentações
				</h1>
				<MovementForm />
			</div>

			<div className="gap-6 grid md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="w-5 h-5" />
							Estoque Atual
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="w-full overflow-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[70%]">Produto</TableHead>
										<TableHead className="w-[30%] text-right">
											Quantidade
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{stock.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={2}
												className="h-24 text-muted-foreground text-center"
											>
												Nenhum produto em estoque
											</TableCell>
										</TableRow>
									) : (
										stock.map((item) => (
											<TableRow key={item.id}>
												<TableCell className="font-medium">
													{item.product.name}
												</TableCell>
												<TableCell className="text-right">
													{item.quantity}
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="w-5 h-5" />
							Últimas Movimentações
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="w-full overflow-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[40%]">Produto</TableHead>
										<TableHead className="w-[30%] text-center">Tipo</TableHead>
										<TableHead className="w-[30%] text-right">
											Quantidade
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{movements.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={3}
												className="h-24 text-muted-foreground text-center"
											>
												Nenhuma movimentação registrada
											</TableCell>
										</TableRow>
									) : (
										movements.map((movement) => (
											<TableRow key={movement.id}>
												<TableCell className="font-medium">
													{movement.product.name}
												</TableCell>
												<TableCell className="text-center">
													{movement.quantity > 0 ? (
														<div className="flex justify-center items-center text-green-500">
															<ArrowDownToLine className="mr-2 w-4 h-4" />
															Entrada
														</div>
													) : (
														<div className="flex justify-center items-center text-red-500">
															<ArrowUpFromLine className="mr-2 w-4 h-4" />
															Saída
														</div>
													)}
												</TableCell>
												<TableCell className="text-right">
													{Math.abs(movement.quantity)}
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
		</div>
	);
}
