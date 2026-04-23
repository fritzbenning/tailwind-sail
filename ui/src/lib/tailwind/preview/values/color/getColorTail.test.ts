import { describe, expect, it } from "vitest";
import { getColorTail } from "./getColorTail";

describe("getColorTail", () => {
	it("returns bg tails when they are colors", () => {
		expect(getColorTail("bg", "red-500")).toBe("red-500");
	});

	it("returns null for bg tails that are not solid colors", () => {
		expect(getColorTail("bg", "cover")).toBe(null);
		expect(getColorTail("bg", "gradient-to-r")).toBe(null);
	});

	it("maps text colors when not typography utilities", () => {
		expect(getColorTail("text", "red-500")).toBe("red-500");
		expect(getColorTail("text", "center")).toBe(null);
	});

	it("strips border edge prefixes before checking non-color heads", () => {
		expect(getColorTail("border", "t-red-500")).toBe("red-500");
		expect(getColorTail("border", "solid")).toBe(null);
	});

	it("supports decoration / accent / fill style prefixes", () => {
		expect(getColorTail("fill", "emerald-400")).toBe("emerald-400");
	});

	it("returns null for unknown utility prefixes", () => {
		expect(getColorTail("unknown", "red-500")).toBe(null);
	});
});
