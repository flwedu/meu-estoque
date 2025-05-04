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
import { zodResolver } from "@hookform/resolvers/zod";
import { Package, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { CategoriesSearchCombobox } from "./categories-search-combobox";
import type { Product } from "@/types";
import { QueryError } from "@/lib/error";

/**
 * Schema de validação para o formulário de produtos
 */
const productFormSchema = z.object({
	name: z.string().min(1, "O nome do produto é obrigatório"),
	price: z.string().min(1, "O preço é obrigatório"),
	categoryIds: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
	/**
	 * Produto a ser editado
	 */
	product?: Product;
	/**
	 * Tipo de ação do formulário
	 */
	mode?: "create" | "edit";
	/**
	 * Função chamada quando o diálogo é fechado
	 */
	onOpenChange?: (open: boolean) => void;
}

/**
 * Componente que renderiza o formulário de cadastro/edição de produtos
 * @param {ProductFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário de produtos
 */
export function ProductForm({
	product,
	mode = "create",
	onOpenChange,
}: ProductFormProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: product?.name ?? "",
			price: product?.price
				? new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: "BRL",
					}).format(product.price)
				: "",
			categoryIds: product?.categories?.map((category) => category.id) ?? [],
		},
	});

	/**
	 * Função que é chamada quando o formulário é submetido
	 * @param {ProductFormValues} data - Dados do formulário
	 */
	async function onSubmit(data: ProductFormValues) {
		try {
			const price = Number(
				data.price.replace(/[^\d,-]/g, "").replace(",", "."),
			);

			const response = await fetch(
				mode === "edit" ? `/api/products/${product?.id}` : "/api/products",
				{
					method: mode === "edit" ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...data,
						price,
					}),
				},
			);

			if (!response.ok) {
				throw new QueryError(
					mode === "edit"
						? "Erro ao atualizar produto"
						: "Erro ao cadastrar produto",
					await response.json(),
				);
			}

			toast.success(
				mode === "edit"
					? "Produto atualizado com sucesso"
					: "Produto cadastrado com sucesso",
			);
			form.reset();
			setOpen(false);
			onOpenChange?.(false);
			// Força um refresh da página para atualizar a tabela
			router.refresh();
		} catch (error) {
			if (error instanceof QueryError) {
				toast.error(error.message);
			} else {
				console.error(error);
				toast.error(
					mode === "edit"
						? "Erro ao atualizar produto"
						: "Erro ao cadastrar produto",
				);
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
				{mode === "edit" ? (
					<Button variant="ghost" size="icon">
						<Pencil className="w-4 h-4" />
					</Button>
				) : (
					<Button className="bg-primary hover:bg-primary/90">
						<Package className="mr-2 w-4 h-4" />
						Novo Produto
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "edit" ? "Editar Produto" : "Novo Produto"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Digite o nome do produto" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preço</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="0,00"
											{...field}
											onChange={(e) => {
												const value = e.target.value.replace(/\D/g, "");
												const formattedValue = new Intl.NumberFormat("pt-BR", {
													style: "currency",
													currency: "BRL",
												}).format(Number(value) / 100);
												field.onChange(formattedValue);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryIds"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Categorias</FormLabel>
									<CategoriesSearchCombobox
										value={field.value}
										onChange={field.onChange}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							{mode === "edit" ? "Atualizar" : "Cadastrar"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
