"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QueryError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const categorySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	icon: z.string().optional(),
});

type CategoryFormValues = z.input<typeof categorySchema>;

interface CategoryFormProps {
	initialData?: CategoryFormValues;
	categoryId?: string;
}

/**
 * Componente de formulário para criar e editar categorias
 * @param {CategoryFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de formulário de categoria
 */
export function CategoryForm({ initialData, categoryId }: CategoryFormProps) {
	const router = useRouter();
	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: initialData || {
			name: "",
			icon: "",
		},
	});

	/**
	 * Envia o formulário
	 * @param {CategoryFormValues} data - Dados do formulário
	 */
	const onSubmit = async (data: CategoryFormValues) => {
		try {
			const url = categoryId
				? `/api/categories/${categoryId}`
				: "/api/categories";
			const method = categoryId ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok)
				throw new QueryError(
					categoryId
						? "Erro ao atualizar categoria"
						: "Erro ao criar categoria",
					await response.json(),
				);

			toast.success(
				categoryId
					? "Categoria atualizada com sucesso"
					: "Categoria criada com sucesso",
			);
			router.push("/categories");
			router.refresh();
		} catch (error) {
			if (error instanceof QueryError) {
				toast.error(error.message);
			} else {
				console.error(error);
				toast.error(
					categoryId
						? "Erro ao atualizar categoria"
						: "Erro ao criar categoria",
				);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="Digite o nome da categoria" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="icon"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ícone</FormLabel>
							<FormControl>
								<Input placeholder="Digite o nome do ícone" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">
					{categoryId ? "Atualizar" : "Criar"} Categoria
				</Button>
			</form>
		</Form>
	);
}
