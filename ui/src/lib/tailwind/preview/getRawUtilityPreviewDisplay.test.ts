import { describe, expect, it } from "vitest";
import { getRawUtilityPreviewDisplay } from "./getRawUtilityPreviewDisplay";

describe("getRawUtilityPreviewDisplay", () => {
	it("prefers merged workspace scan over builtin (text-2xl)", () => {
		expect(
			getRawUtilityPreviewDisplay("text-2xl", [
				{
					name: "--text-2xl",
					value: "16rem",
					locations: [],
				},
			]),
		).toBe("256px");
	});

	it("falls back to builtin when scan has no matching token", () => {
		expect(getRawUtilityPreviewDisplay("text-2xl", [])).toBe("24px");
	});

	it("prefers merged workspace scan for leading-* (unitless)", () => {
		expect(
			getRawUtilityPreviewDisplay("leading-tight", [
				{ name: "--leading-tight", value: "1.3", locations: [] },
			]),
		).toBe("1.3");
	});

	it("falls back to builtin for leading (relative or px)", () => {
		expect(getRawUtilityPreviewDisplay("leading-snug", [])).toBe("1.375");
		expect(getRawUtilityPreviewDisplay("leading-6", [])).toBe("24px");
	});

	it("skips scanned var() and can fall through (no match → builtin)", () => {
		expect(
			getRawUtilityPreviewDisplay("text-2xl", [
				{
					name: "--text-2xl",
					value: "var(--foo)",
					locations: [],
				},
			]),
		).toBe("24px");
	});

	it("uses theme --spacing for built-in raw labels when per-step token is non-plain", () => {
		expect(
			getRawUtilityPreviewDisplay("p-4", [
				{ name: "--spacing", value: "12px", locations: [] },
				{ name: "--spacing-4", value: "var(--spacing)", locations: [] },
			]),
		).toBe("48px");
	});

	it("uses theme --spacing (rem) for built-in scale", () => {
		expect(
			getRawUtilityPreviewDisplay("p-2", [
				{ name: "--spacing", value: "0.3rem", locations: [] },
			]),
		).toBe("10px");
	});
});
