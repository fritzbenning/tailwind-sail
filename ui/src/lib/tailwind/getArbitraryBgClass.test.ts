import { describe, expect, it } from "vitest";
import { getArbitraryBgClass } from "./getArbitraryBgClass";

describe("getArbitraryBgClass", () => {
	it("wraps a color string in bg-[…]", () => {
		expect(getArbitraryBgClass("#f97316")).toBe("bg-[#f97316]");
	});

	it("escapes closing brackets and backslashes", () => {
		expect(getArbitraryBgClass("a]b")).toBe("bg-[a\\]b]");
		expect(getArbitraryBgClass("a\\b")).toBe("bg-[a\\\\b]");
	});
});
