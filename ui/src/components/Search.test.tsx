import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { Search } from "./Search";

describe("Search", () => {
	it("shows the filter field and forwards input", () => {
		const onInput = vi.fn();
		const onClear = vi.fn();
		render(() => <Search value="" onInput={onInput} onClear={onClear} />);
		const field = screen.getByPlaceholderText("Filter classes");
		fireEvent.input(field, { target: { value: "flex" } });
		expect(onInput).toHaveBeenCalledWith("flex");
	});

	it("shows clear when value is non-empty and clears on Escape", () => {
		const onInput = vi.fn();
		const onClear = vi.fn();
		render(() => <Search value="x" onInput={onInput} onClear={onClear} />);
		expect(screen.getByRole("button", { name: "Clear search" })).toBeVisible();
		const field = screen.getByPlaceholderText("Filter classes");
		fireEvent.keyDown(field, { key: "Escape" });
		expect(onClear).toHaveBeenCalledTimes(1);
	});
});
