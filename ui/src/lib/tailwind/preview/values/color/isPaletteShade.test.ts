import { describe, expect, it } from "vitest";
import { isPaletteShade } from "./isPaletteShade";

describe("isPaletteShade", () => {
	it("matches palette name and numeric shade", () => {
		expect(isPaletteShade("red-500")).toBe(true);
		expect(isPaletteShade("slate-900/50")).toBe(true);
	});

	it("rejects incomplete or unknown names", () => {
		expect(isPaletteShade("red")).toBe(false);
		expect(isPaletteShade("foo-500")).toBe(false);
	});
});
