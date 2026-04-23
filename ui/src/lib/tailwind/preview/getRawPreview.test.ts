import { describe, expect, it } from "vitest";
import { getRawPreview } from "./getRawPreview";

describe("getRawPreview", () => {
	it("returns undefined for utilities with arbitrary brackets (no built-in preview path)", () => {
		expect(getRawPreview("p-[1rem]", [])).toBeUndefined();
	});

	it("prefers merged workspace scan over default theme (text-2xl)", () => {
		expect(
			getRawPreview("text-2xl", [
				{
					name: "--text-2xl",
					value: "16rem",
					locations: [],
				},
			]),
		).toBe("256px");
	});

	it("falls back to default theme when scan has no matching token", () => {
		expect(getRawPreview("text-2xl", [])).toBe("24px");
	});

	it("prefers merged workspace scan for leading-* (unitless)", () => {
		expect(
			getRawPreview("leading-tight", [
				{ name: "--leading-tight", value: "1.3", locations: [] },
			]),
		).toBe("1.3");
	});

	it("falls back to default theme for leading (relative or px)", () => {
		expect(getRawPreview("leading-snug", [])).toBe("1.375");
		expect(getRawPreview("leading-6", [])).toBe("24px");
	});

	it("skips scanned var() and can fall through (no match → default theme)", () => {
		expect(
			getRawPreview("text-2xl", [
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
			getRawPreview("p-4", [
				{ name: "--spacing", value: "12px", locations: [] },
				{ name: "--spacing-4", value: "var(--spacing)", locations: [] },
			]),
		).toBe("48px");
	});

	it("uses theme --spacing (rem) for built-in scale", () => {
		expect(
			getRawPreview("p-2", [
				{ name: "--spacing", value: "0.3rem", locations: [] },
			]),
		).toBe("10px");
	});
});
