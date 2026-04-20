import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
	it("renders a filled input by default", () => {
		render(() => <Input placeholder="p" />);
		const el = screen.getByPlaceholderText("p");
		expect(el).toHaveClass("class-token-input");
		expect(el.className).toContain("border-(--vscode-input-border");
	});

	it("applies inline variant classes", () => {
		render(() => <Input variant="inline" placeholder="x" />);
		const el = screen.getByPlaceholderText("x");
		expect(el.className).toContain("border-transparent");
	});
});
