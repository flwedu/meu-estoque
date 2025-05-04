"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ProductsSearchCombobox } from "./products-search-combobox";
import { QueryError } from "@/lib/error";

/**
 * Schema de validação para o formulário de movimentações
 */
const movementFormSchema = z.object({
	productId: z.string().min(1, "O produto é obrigatório"),
	type: z.enum(["in", "out"], {
		required_error: "O tipo de movimentação é obrigatório",
	}),
	quantity: z.string().min(1, "A quantidade é obrigatória"),
});

type MovementFormValues = z.infer<typeof movementFormSchema>;

interface MovementFormProps {
	/**
	 * Função chamada quando o diálogo é fechado
	 */
	onOpenChange?: (open: boolean) => void;
}

/**
 * Componente que renderiza o formulário de movimentações de produtos
 * @param {MovementFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário de movimentações
 */
export function MovementForm({ onOpenChange }: MovementFormProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<MovementFormValues>({
		resolver: zodResolver(movementFormSchema),
		defaultValues: {
			productId: "",
			type: "in",
			quantity: "",
		},
	});

	/**
	 * Função que é chamada quando o formulário é submetido
	 * @param {MovementFormValues} data - Dados do formulário
	 */
	async function onSubmit(data: MovementFormValues) {
		try {
			const quantity = Number(data.quantity);
			const finalQuantity = data.type === "out" ? -quantity : quantity;

			const response = await fetch("/api/movements", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					productId: data.productId,
					quantity: finalQuantity,
				}),
			});

			if (!response.ok)
				throw new QueryError(
					"Erro ao registrar movimentação",
					await response.json(),
				);

			toast.success("Movimentação registrada com sucesso");
			form.reset();
			setOpen(false);
			onOpenChange?.(false);
			router.refresh();
		} catch (error) {
			if (error instanceof QueryError) {
				toast.error(error.message);
			} else {
				console.error(error);
				toast.error("Erro ao registrar movimentação");
			}
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				setOpen(value);
				onOpenChange?.(value);
			}}
		>
			<DialogTrigger asChild>
				<Button className="bg-primary hover:bg-primary/90">
					<ArrowUpFromLine className="mr-2 w-4 h-4" />
					Nova Movimentação
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Nova Movimentação</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="productId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Produto</FormLabel>
									<ProductsSearchCombobox
										value={field.value}
										onChange={field.onChange}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione o tipo" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="in">
												<div className="flex items-center">
													<ArrowDownToLine className="mr-2 w-4 h-4 text-green-500" />
													Entrada
												</div>
											</SelectItem>
											<SelectItem value="out">
												<div className="flex items-center">
													<ArrowUpFromLine className="mr-2 w-4 h-4 text-red-500" />
													Saída
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantidade</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="1"
											placeholder="Digite a quantidade"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Registrar
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
