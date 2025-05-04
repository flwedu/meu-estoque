"use client";

import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { type JSX, useState } from "react";
import useSwr from "swr";
import { Button } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ProductsSearchComboboxProps = {
	value: string;
	onChange: (value: string) => void;
};

/**
 * Componente que busca produtos e exibe em um combobox
 * @param {ProductsSearchComboboxProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de busca de produtos
 */
export function ProductsSearchCombobox({
	value,
	onChange,
}: ProductsSearchComboboxProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | null>(value);
	const [search, setSearch] = useState("");

	const {
		data: products,
		isLoading,
		error,
	} = useSwr(`/api/products?name=${search}`, async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		return data as Product[];
	});

	if (error) {
		return <div>Erro ao buscar produtos</div>;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="combobox"
					aria-expanded={open}
					className="justify-between w-[200px]"
				>
					{selectedValue
						? products?.find((product) => product.id === selectedValue)?.name
						: "Selecione um produto"}
					<ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-[200px]">
				<Command>
					<CommandInput
						placeholder="Pesquisar produto..."
						onValueChange={(value) => {
							setSearch(value);
						}}
						value={search}
					/>
					{isLoading ? (
						<CommandList>
							<CommandEmpty>Carregando...</CommandEmpty>
						</CommandList>
					) : (
						<CommandList>
							<CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
							<CommandGroup>
								{products?.map((product) => (
									<CommandItem
										key={product.id}
										value={product.id}
										onSelect={() => {
											setSelectedValue(product.id);
											onChange(product.id);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												selectedValue === product.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{product.name}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					)}
				</Command>
			</PopoverContent>
		</Popover>
	);
}
