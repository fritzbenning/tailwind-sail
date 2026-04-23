import { describe, expect, it } from "vitest";
import { getColorTailForSolidBg } from "./getColorTailForSolidBg";

describe("getColorTailForSolidBg", () => {
	it("returns bg tails when they are colors", () => {
		expect(getColorTailForSolidBg("bg", "red-500")).toBe("red-500");
	});

	it("returns null for bg tails that are not solid colors", () => {
		expect(getColorTailForSolidBg("bg", "cover")).toBe(null);
		expect(getColorTailForSolidBg("bg", "gradient-to-r")).toBe(null);
	});

	it("maps text colors when not typography utilities", () => {
		expect(getColorTailForSolidBg("text", "red-500")).toBe("red-500");
		expect(getColorTailForSolidBg("text", "center")).toBe(null);
	});

	it("strips border edge prefixes before checking non-color heads", () => {
		expect(getColorTailForSolidBg("border", "t-red-500")).toBe("red-500");
		expect(getColorTailForSolidBg("border", "solid")).toBe(null);
	});

	it("supports decoration / accent / fill style prefixes", () => {
		expect(getColorTailForSolidBg("fill", "emerald-400")).toBe("emerald-400");
	});

	it("returns null for unknown utility prefixes", () => {
		expect(getColorTailForSolidBg("unknown", "red-500")).toBe(null);
	});
});
