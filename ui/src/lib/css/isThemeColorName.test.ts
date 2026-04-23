import { describe, expect, it } from "vitest";
import { isThemeColorName } from "./isThemeColorName";

describe("isThemeColorName", () => {
	it("returns true for @theme color tokens with a stem", () => {
		expect(isThemeColorName("--color-primary")).toBe(true);
		expect(isThemeColorName("--color-foo_bar-1")).toBe(true);
	});

	it("returns false for bare --color- prefix or other variables", () => {
		expect(isThemeColorName("--color-")).toBe(false);
		expect(isThemeColorName("--spacing-4")).toBe(false);
		expect(isThemeColorName("color-primary")).toBe(false);
	});
});
