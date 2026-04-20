import { describe, expect, it } from "vitest";
import { isSpecial } from "./isSpecial";

describe("isSpecial", () => {
	it("detects built-in named colors before opacity or shade segments", () => {
		expect(isSpecial("black")).toBe(true);
		expect(isSpecial("white/50")).toBe(true);
	});

	it("returns false for palette shades", () => {
		expect(isSpecial("red-500")).toBe(false);
	});
});
