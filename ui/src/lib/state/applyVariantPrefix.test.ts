import { describe, expect, it, vi } from "vitest";
import { applyVariantPrefix } from "./applyVariantPrefix";

describe("applyVariantPrefix", () => {
	it("prefixes the input when the variant prefix changes", () => {
		const input = document.createElement("input");
		input.value = "flex";
		applyVariantPrefix(input, "md:");
		expect(input.value).toBe("md:flex");
		expect(input.dataset.variantPrefix).toBe("md:");
	});

	it("rewrites the body when swapping one prefix for another", () => {
		const input = document.createElement("input");
		input.value = "md:flex";
		input.dataset.variantPrefix = "md:";
		applyVariantPrefix(input, "lg:");
		expect(input.value).toBe("lg:flex");
	});

	it("strips redundant leading light: when the new prefix is not light", () => {
		const input = document.createElement("input");
		input.value = "light:text-red-500";
		input.dataset.variantPrefix = "";
		applyVariantPrefix(input, "");
		expect(input.value).toBe("text-red-500");
	});

	it("moves the caret to the end when the input is focused", async () => {
		const input = document.createElement("input");
		input.value = "x";
		document.body.append(input);
		input.focus();
		const spy = vi.spyOn(input, "setSelectionRange");
		applyVariantPrefix(input, "md:");
		await new Promise<void>((resolve) => queueMicrotask(resolve));
		expect(spy).toHaveBeenCalledWith(input.value.length, input.value.length);
		spy.mockRestore();
		input.remove();
	});
});
