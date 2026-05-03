import { describe, expect, it } from "vitest";
import { findColorTail } from "./findColorTail";

describe("findColorTail", () => {
	it("returns bg tails when they are colors", () => {
		expect(findColorTail("bg", "red-500")).toBe("red-500");
	});

	it("returns null for bg tails that are not solid colors", () => {
		expect(findColorTail("bg", "cover")).toBe(null);
		expect(findColorTail("bg", "gradient-to-r")).toBe(null);
	});

	it("maps text colors when not typography utilities", () => {
		expect(findColorTail("text", "red-500")).toBe("red-500");
		expect(findColorTail("text", "center")).toBe(null);
	});

	it("strips border edge prefixes before checking non-color heads", () => {
		expect(findColorTail("border", "t-red-500")).toBe("red-500");
		expect(findColorTail("border", "solid")).toBe(null);
	});

	it("supports decoration / accent / fill style prefixes", () => {
		expect(findColorTail("fill", "emerald-400")).toBe("emerald-400");
	});

	it("returns null for unknown utility prefixes", () => {
		expect(findColorTail("unknown", "red-500")).toBe(null);
	});
});
