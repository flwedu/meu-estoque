import { z } from "zod";

/**
 * Schema de validação para o formulário de produtos
 */
export const productFormSchema = z.object({
	name: z.string().min(1, "O nome do produto é obrigatório"),
	price: z.string().min(1, "O preço é obrigatório"),
	categoryIds: z.array(z.string()).optional(),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
export type ProductFormOutput = z.output<typeof productFormSchema>;
