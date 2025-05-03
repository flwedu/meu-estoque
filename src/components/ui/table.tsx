import { cn } from "@/lib/utils";
import * as React from "react";

/**
 * Interface que representa as propriedades da tabela
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

/**
 * Componente de tabela customizado
 * @param props - Propriedades da tabela
 * @returns Componente React
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
	({ className, ...props }, ref) => (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	),
);
Table.displayName = "Table";

/**
 * Interface que representa as propriedades do cabeçalho da tabela
 */
export interface TableHeaderProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Componente de cabeçalho da tabela
 * @param props - Propriedades do cabeçalho
 * @returns Componente React
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
	({ className, ...props }, ref) => (
		<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
	),
);
TableHeader.displayName = "TableHeader";

/**
 * Interface que representa as propriedades do corpo da tabela
 */
export interface TableBodyProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Componente de corpo da tabela
 * @param props - Propriedades do corpo
 * @returns Componente React
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
	({ className, ...props }, ref) => (
		<tbody
			ref={ref}
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	),
);
TableBody.displayName = "TableBody";

/**
 * Interface que representa as propriedades do rodapé da tabela
 */
export interface TableFooterProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Componente de rodapé da tabela
 * @param props - Propriedades do rodapé
 * @returns Componente React
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
	({ className, ...props }, ref) => (
		<tfoot
			ref={ref}
			className={cn("bg-gray-900 font-medium text-gray-50", className)}
			{...props}
		/>
	),
);
TableFooter.displayName = "TableFooter";

/**
 * Interface que representa as propriedades da linha da tabela
 */
export interface TableRowProps
	extends React.HTMLAttributes<HTMLTableRowElement> {}

/**
 * Componente de linha da tabela
 * @param props - Propriedades da linha
 * @returns Componente React
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				"border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100",
				className,
			)}
			{...props}
		/>
	),
);
TableRow.displayName = "TableRow";

/**
 * Interface que representa as propriedades do cabeçalho da célula
 */
export interface TableHeadProps
	extends React.ThHTMLAttributes<HTMLTableCellElement> {}

/**
 * Componente de cabeçalho da célula
 * @param props - Propriedades do cabeçalho
 * @returns Componente React
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				"h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	),
);
TableHead.displayName = "TableHead";

/**
 * Interface que representa as propriedades da célula
 */
export interface TableCellProps
	extends React.TdHTMLAttributes<HTMLTableCellElement> {}

/**
 * Componente de célula
 * @param props - Propriedades da célula
 * @returns Componente React
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={cn(
				"p-4 align-middle [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	),
);
TableCell.displayName = "TableCell";

export {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
