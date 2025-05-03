import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Boxes, Package, TrendingDown, TrendingUp } from "lucide-react";

/**
 * Componente que exibe o dashboard principal do sistema
 * @returns {JSX.Element} Dashboard com cards informativos
 */
export function Dashboard() {
	return (
		<div className="space-y-6 p-6">
			<h1 className="font-bold text-3xl">Dashboard</h1>
			<div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Total de Produtos
						</CardTitle>
						<Package className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">0</div>
						<p className="text-muted-foreground text-xs">
							Produtos cadastrados
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Itens em Estoque
						</CardTitle>
						<Boxes className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">0</div>
						<p className="text-muted-foreground text-xs">
							Unidades disponíveis
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Entradas</CardTitle>
						<TrendingUp className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">0</div>
						<p className="text-muted-foreground text-xs">Entradas no mês</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Saídas</CardTitle>
						<TrendingDown className="w-4 h-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">0</div>
						<p className="text-muted-foreground text-xs">Saídas no mês</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
