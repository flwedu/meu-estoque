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
import { getStockForProducts } from "@/queries/stock";

export default async function StockPage() {
	const stock = await getStockForProducts();

	return (
		<div className="space-y-6 p-6 w-full">
			<div className="flex justify-between items-center">
				<h1 className="max-w-[150px] sm:max-w-[300px] font-bold text-3xl truncate">
					Estoque Atual
				</h1>
				<MovementForm />
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Estoque por produto</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead>Quantidade</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{stock.map((item) => (
								<TableRow key={item.product.id}>
									<TableCell>{item.product.name}</TableCell>
									<TableCell>{item.quantity}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
