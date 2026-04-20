import { describe, expect, it } from "vitest";
import { getArbitraryColorValue } from "./getArbitraryColorValue";

describe("getArbitraryColorValue", () => {
	it("parses hex colors inside brackets", () => {
		expect(getArbitraryColorValue("[#f97316]")).toBe("#f97316");
		expect(getArbitraryColorValue("[#abc]")).toBe("#abc");
	});

	it("parses functional color syntax", () => {
		expect(getArbitraryColorValue("[rgb(0 0 0)]")).toBe("rgb(0 0 0)");
		expect(getArbitraryColorValue("[oklch(0.7 0.1 250)]")).toBe(
			"oklch(0.7 0.1 250)",
		);
	});

	it("parses color-mix()", () => {
		expect(getArbitraryColorValue("[color-mix(in srgb, red, blue)]")).toBe(
			"color-mix(in srgb, red, blue)",
		);
	});

	it("returns null for non-color arbitrary values", () => {
		expect(getArbitraryColorValue("[2px]")).toBe(null);
	});
});
