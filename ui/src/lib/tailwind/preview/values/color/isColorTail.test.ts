import { describe, expect, it } from "vitest";
import { isColorTail } from "./isColorTail";

describe("isColorTail", () => {
	it("is false for layout and gradient tails", () => {
		expect(isColorTail("cover")).toBe(false);
		expect(isColorTail("gradient-to-r")).toBe(false);
	});

	it("is true for palette color tails", () => {
		expect(isColorTail("red-500")).toBe(true);
	});
});
