import { describe, expect, it } from "vitest";
import { isHslValue } from "./isHslValue";

describe("isHslValue", () => {
	it("returns true for space-separated HSL channel components", () => {
		expect(isHslValue("0 0% 9%")).toBe(true);
		expect(isHslValue("360 100% 50%")).toBe(true);
	});

	it("trims surrounding whitespace", () => {
		expect(isHslValue(" 0 0% 9% ")).toBe(true);
	});

	it("returns true for channel tokens with alpha", () => {
		expect(isHslValue("0 0% 9% / 0.5")).toBe(true);
		expect(isHslValue("0 0% 9% / 50%")).toBe(true);
	});

	it("returns false for hex, hsl(), and non-channel values", () => {
		expect(isHslValue("#f97316")).toBe(false);
		expect(isHslValue("hsl(0 0% 9%)")).toBe(false);
		expect(isHslValue("1rem")).toBe(false);
		expect(isHslValue("")).toBe(false);
	});
});
