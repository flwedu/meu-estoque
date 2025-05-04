/**
 * Interface que representa uma categoria no sistema
 */
export interface Category {
	id: string;
	name: string;
	icon?: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Interface que representa um produto no sistema
 */
export interface Product {
	id: string;
	name: string;
	price: number;
	createdAt: Date;
	updatedAt: Date;
	categories: Category[];
}

/**
 * Interface que representa uma imagem de produto no sistema
 */
export interface ProductImage {
	id: string;
	productId: string;
	imageUrl: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Interface que representa o relacionamento entre produto e categoria
 */
export interface ProductCategory {
	id: string;
	productId: string;
	categoryId: string;
}

/**
 * Interface que representa um usuário no sistema
 */
export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Interface que representa o estoque de um produto
 */
export interface Stock {
	id: string;
	productId: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Interface que representa um movimento de estoque
 */
export interface Movement {
	id: string;
	productId: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
	product: Product;
}
