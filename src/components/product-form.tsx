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
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

/**
 * Schema de validação para o formulário de produtos
 */
const productFormSchema = z.object({
	name: z.string().min(1, "O nome do produto é obrigatório"),
	price: z.string().min(1, "O preço é obrigatório"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

/**
 * Componente que renderiza o formulário de cadastro de produtos
 * @returns {JSX.Element} Formulário de produtos
 */
export function ProductForm(): JSX.Element {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: "",
			price: "",
		},
	});

	/**
	 * Função que é chamada quando o formulário é submetido
	 * @param {ProductFormValues} data - Dados do formulário
	 */
	async function onSubmit(data: ProductFormValues) {
		try {
			const response = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					price: Number(data.price.replace(",", ".")),
				}),
			});

			if (!response.ok) {
				throw new Error("Erro ao cadastrar produto");
			}

			toast.success("Produto cadastrado com sucesso");
			form.reset();
			setOpen(false);
			// Força um refresh da página para atualizar a tabela
			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error("Erro ao cadastrar produto");
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-primary hover:bg-primary/90">
					<Package className="mr-2 w-4 h-4" />
					Novo Produto
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Novo Produto</DialogTitle>
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
						<Button type="submit" className="w-full">
							Cadastrar
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
