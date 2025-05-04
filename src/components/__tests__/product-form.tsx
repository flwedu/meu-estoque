import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductForm } from "../product-form";

/**
 * Mock do fetch global
 */
global.fetch = vi.fn();

describe("ProductForm", () => {
	it("deve renderizar o formulário corretamente", () => {
		render(<ProductForm />);

		expect(screen.getByText("Novo Produto")).toBeInTheDocument();
		expect(screen.getByLabelText("Nome")).toBeInTheDocument();
		expect(screen.getByLabelText("Preço")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Cadastrar" }),
		).toBeInTheDocument();
	});

	it("deve validar campos obrigatórios", async () => {
		render(<ProductForm />);

		const submitButton = screen.getByRole("button", { name: "Cadastrar" });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("O nome do produto é obrigatório"),
			).toBeInTheDocument();
			expect(screen.getByText("O preço é obrigatório")).toBeInTheDocument();
		});
	});

	it("deve enviar o formulário com sucesso", async () => {
		const mockResponse = { id: "1", name: "Produto Teste", price: 10.99 };
		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
			{
				ok: true,
				json: async () => mockResponse,
			},
		);

		render(<ProductForm />);

		const nameInput = screen.getByLabelText("Nome");
		const priceInput = screen.getByLabelText("Preço");
		const submitButton = screen.getByRole("button", { name: "Cadastrar" });

		fireEvent.change(nameInput, { target: { value: "Produto Teste" } });
		fireEvent.change(priceInput, { target: { value: "10,99" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "Produto Teste",
					price: 10.99,
				}),
			});
		});
	});

	it("deve lidar com erro ao enviar o formulário", async () => {
		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error("Erro ao cadastrar produto"),
		);

		render(<ProductForm />);

		const nameInput = screen.getByLabelText("Nome");
		const priceInput = screen.getByLabelText("Preço");
		const submitButton = screen.getByRole("button", { name: "Cadastrar" });

		fireEvent.change(nameInput, { target: { value: "Produto Teste" } });
		fireEvent.change(priceInput, { target: { value: "10,99" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(console.error).toHaveBeenCalled();
		});
	});
});
