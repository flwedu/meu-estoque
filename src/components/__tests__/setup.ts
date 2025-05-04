import "@testing-library/jest-dom";
import { vi } from "vitest";

/**
 * Mock do console.error para evitar poluição do console durante os testes
 */
vi.spyOn(console, "error").mockImplementation(() => {});
