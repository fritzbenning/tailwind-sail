import { describe, expect, it } from "vitest";
import { getArbitraryColor } from "./getArbitraryColor";

describe("getArbitraryColor", () => {
	it("returns null when there is no arbitrary color segment", () => {
		expect(getArbitraryColor("bg-red-500")).toBe(null);
	});

	it("parses hex colors inside brackets", () => {
		expect(getArbitraryColor("text-[#f97316]")).toBe("#f97316");
		expect(getArbitraryColor("text-[#abc]")).toBe("#abc");
	});

	it("parses functional color syntax", () => {
		expect(getArbitraryColor("text-[rgb(0 0 0)]")).toBe("rgb(0 0 0)");
		expect(getArbitraryColor("text-[oklch(0.7 0.1 250)]")).toBe(
			"oklch(0.7 0.1 250)",
		);
	});

	it("parses color-mix()", () => {
		expect(getArbitraryColor("text-[color-mix(in srgb, red, blue)]")).toBe(
			"color-mix(in srgb, red, blue)",
		);
	});

	it("returns null for non-color arbitrary values", () => {
		expect(getArbitraryColor("text-[2px]")).toBe(null);
	});
});
