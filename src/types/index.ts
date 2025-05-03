/**
 * Interface que representa uma categoria de produto
 */
export interface Categoria {
	id: string;
	nome: string;
	descricao?: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Interface que representa um produto
 */
export interface Produto {
	id: string;
	nome: string;
	descricao?: string;
	preco: number;
	quantidade: number;
	categoriaId: string;
	categoria: Categoria;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Enum que representa os tipos de movimentação
 */
export enum TipoMovimentacao {
	ENTRADA = "ENTRADA",
	SAIDA = "SAIDA",
}

/**
 * Interface que representa uma movimentação de estoque
 */
export interface Movimentacao {
	id: string;
	tipo: TipoMovimentacao;
	quantidade: number;
	produtoId: string;
	produto: Produto;
	observacao?: string;
	createdAt: Date;
}
