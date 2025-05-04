import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	getEntriesCount,
	getExitsCount,
	getMovements,
	getStockSum,
} from "@/queries/movements";
import { format } from "date-fns";
import { ArrowDownToLine, ArrowUpFromLine, Boxes } from "lucide-react";
import type { JSX } from "react";

/**
 * Página que exibe o gerenciamento de estoque
 * @returns {JSX.Element} Página de gerenciamento de estoque
 */
export default async function MovementsPage(): Promise<JSX.Element> {
	const movements = await getMovements();
	const stock = await getStockSum();
	const entries = await getEntriesCount();
	const exits = await getExitsCount();

	return (
		<div className="space-y-6 p-6">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Estoque</h1>
				<div className="flex gap-2">
					<button
						type="button"
						className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-primary-foreground"
					>
						<ArrowDownToLine className="w-4 h-4" />
						Registrar Entrada
					</button>
					<button
						type="button"
						className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 px-4 py-2 rounded-md text-destructive-foreground text-white"
					>
						<ArrowUpFromLine className="w-4 h-4" />
						Registrar Saída
					</button>
				</div>
			</div>

			<div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Total em Estoque
						</CardTitle>
						<Boxes className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{stock}</div>
						<p className="text-muted-foreground text-xs">
							Unidades disponíveis
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Entradas do Mês
						</CardTitle>
						<ArrowDownToLine className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{entries}</div>
						<p className="text-muted-foreground text-xs">Unidades recebidas</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Saídas do Mês</CardTitle>
						<ArrowUpFromLine className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{exits}</div>
						<p className="text-muted-foreground text-xs">Unidades retiradas</p>
					</CardContent>
				</Card>
			</div>

			<Card className="w-full">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Boxes className="w-5 h-5" />
						Histórico de Movimentações
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="w-full overflow-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[25%]">Produto</TableHead>
									<TableHead className="w-[15%]">Tipo</TableHead>
									<TableHead className="w-[15%] text-right">
										Quantidade
									</TableHead>
									<TableHead className="w-[20%]">Data</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{movements.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
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
											<TableCell>
												<span
													className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
														movement.quantity > 0
															? "bg-green-100 text-green-700"
															: "bg-red-100 text-red-700"
													}`}
												>
													{movement.quantity > 0 ? "Entrada" : "Saída"}
												</span>
											</TableCell>
											<TableCell className="text-right">
												{movement.quantity}
											</TableCell>
											<TableCell>
												{format(movement.createdAt, "dd/MM/yyyy HH:mm")}
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
