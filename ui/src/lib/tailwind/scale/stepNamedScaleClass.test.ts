import { describe, expect, it } from "vitest";
import { stepNamedScaleClass } from "./stepNamedScaleClass";

describe("stepNamedScaleClass", () => {
	it("steps general named tails (breakpoints / shared keywords)", () => {
		expect(stepNamedScaleClass("rounded-md", 1)).toBe("rounded-lg");
		expect(stepNamedScaleClass("rounded-lg", -1)).toBe("rounded-md");
		expect(stepNamedScaleClass("max-w-xl", 1)).toBe("max-w-2xl");
		expect(stepNamedScaleClass("max-w-2xl", -1)).toBe("max-w-xl");
	});

	it("steps typography scale for text-* (font-size keywords)", () => {
		expect(stepNamedScaleClass("text-sm", 1)).toBe("text-base");
		expect(stepNamedScaleClass("text-base", -1)).toBe("text-sm");
		expect(stepNamedScaleClass("text-xl", 1)).toBe("text-2xl");
	});

	it("preserves variant prefixes and important", () => {
		expect(stepNamedScaleClass("md:text-sm", 1)).toBe("md:text-base");
		expect(stepNamedScaleClass("hover:!shadow-lg", -1)).toBe(
			"hover:!shadow-md",
		);
	});

	it("returns null when no named tail or out of range", () => {
		expect(stepNamedScaleClass("p-4", 1)).toBeNull();
		expect(stepNamedScaleClass("font-bold", 1)).toBeNull();
		expect(stepNamedScaleClass("text-[13px]", 1)).toBeNull();
		expect(stepNamedScaleClass("text-xs", -1)).toBeNull();
		expect(stepNamedScaleClass("text-9xl", 1)).toBeNull();
	});
});
