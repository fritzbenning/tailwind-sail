import { describe, expect, it } from "vitest";
import { isColorValue } from "./isColorValue";

describe("isColorValue", () => {
	it("returns false for empty or non-color values", () => {
		expect(isColorValue("")).toBe(false);
		expect(isColorValue("  ")).toBe(false);
		expect(isColorValue("1rem")).toBe(false);
		expect(isColorValue("12")).toBe(false);
	});

	it("accepts hex colors", () => {
		expect(isColorValue("#f00")).toBe(true);
		expect(isColorValue("#F97316")).toBe(true);
		expect(isColorValue("#f97316a8")).toBe(true);
	});

	it("accepts functional color syntaxes", () => {
		expect(isColorValue("rgb(0 0 0)")).toBe(true);
		expect(isColorValue("RGB(1,2,3)")).toBe(true);
		expect(isColorValue("hsl(0 0% 9%)")).toBe(true);
		expect(isColorValue("hsla(0, 0%, 9%, 0.5)")).toBe(true);
		expect(isColorValue("oklch(0.5 0.1 180)")).toBe(true);
		expect(isColorValue("color(display-p3 1 0 0)")).toBe(true);
	});

	it("accepts color-mix()", () => {
		expect(isColorValue("color-mix(in srgb, red, blue)")).toBe(true);
	});

	it("accepts shadcn-style HSL channel tokens without hsl()", () => {
		expect(isColorValue("0 0% 9%")).toBe(true);
	});

	it("accepts var(--name) to known-like custom property refs", () => {
		expect(isColorValue("var(--y)")).toBe(true);
		expect(isColorValue("var(  --my-token-1  )")).toBe(true);
	});

	it("rejects var() with invalid custom property name", () => {
		expect(isColorValue("var(--)")).toBe(false);
		expect(isColorValue("var(foo)")).toBe(false);
	});
});
