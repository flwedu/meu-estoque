"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { type JSX, useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface Category {
	id: string;
	name: string;
	icon: string;
}

interface CategoriesSearchComboboxProps {
	value: string[];
	onChange: (value: string[]) => void;
}

/**
 * Componente que renderiza um combobox para busca e seleção de categorias
 * @param {CategoriesSearchComboboxProps} props - Propriedades do componente
 * @returns {JSX.Element} Combobox de categorias
 */
export function CategoriesSearchCombobox({
	value,
	onChange,
}: CategoriesSearchComboboxProps): JSX.Element {
	const [open, setOpen] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		async function fetchCategories() {
			const response = await fetch("/api/categories");
			if (response.ok) {
				const data = await response.json();
				setCategories(data);
			}
		}

		fetchCategories();
	}, []);

	const selectedCategories = categories.filter((category) =>
		value.includes(category.id),
	);

	return (
		<div className="flex flex-col gap-2">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between w-full"
					>
						{selectedCategories.length > 0
							? `${selectedCategories.length} categoria(s) selecionada(s)`
							: "Selecione as categorias..."}
						<ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-full">
					<Command>
						<CommandInput
							placeholder="Buscar categoria..."
							value={search}
							onValueChange={setSearch}
						/>
						<CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
						<CommandGroup>
							{categories.map((category) => (
								<CommandItem
									key={category.id}
									value={category.id}
									onSelect={(currentValue) => {
										const newValue = value.includes(currentValue)
											? value.filter((id) => id !== currentValue)
											: [...value, currentValue];
										onChange(newValue);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value.includes(category.id) ? "opacity-100" : "opacity-0",
										)}
									/>
									{category.name}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			{selectedCategories.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selectedCategories.map((category) => (
						<Badge
							key={category.id}
							variant="secondary"
							className="flex items-center gap-1"
						>
							{category.name}
							<button
								type="button"
								onClick={() => {
									onChange(value.filter((id) => id !== category.id));
								}}
								className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2"
							>
								<X className="w-3 h-3" />
								<span className="sr-only">Remover {category.name}</span>
							</button>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}
