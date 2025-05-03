import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

// Estende os matchers do Vitest com os do jest-dom
expect.extend(matchers);

// Limpa após cada teste
afterEach(() => {
	cleanup();
});
