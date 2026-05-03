import { describe, expect, it } from "vitest";
import { findArbitraryColor } from "./findArbitraryColor";

describe("findArbitraryColor", () => {
	it("returns null for non-bracket palettes", () => {
		expect(findArbitraryColor("bg-red-500")).toBe(null);
	});

	it("accepts arbitrary hex fragments", () => {
		expect(findArbitraryColor("text-[#f97316]")).toBe("#f97316");
		expect(findArbitraryColor("text-[#abc]")).toBe("#abc");
	});

	it("accepts arbitrary color functions", () => {
		expect(findArbitraryColor("text-[rgb(0 0 0)]")).toBe("rgb(0 0 0)");
		expect(findArbitraryColor("text-[oklch(0.7 0.1 250)]")).toBe(
			"oklch(0.7 0.1 250)",
		);
	});

	it("accepts color-mix", () => {
		expect(findArbitraryColor("text-[color-mix(in srgb, red, blue)]")).toBe(
			"color-mix(in srgb, red, blue)",
		);
	});

	it("returns null when bracket content is not a color literal", () => {
		expect(findArbitraryColor("text-[2px]")).toBe(null);
	});
});
