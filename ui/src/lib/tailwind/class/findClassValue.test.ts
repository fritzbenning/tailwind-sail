import { describe, expect, it } from "vitest";
import { findClassValue } from "./findClassValue";

describe("findClassValue", () => {
	it("parses single-segment tails when the utility matches prefix", () => {
		expect(findClassValue("text-sm", "text-")).toBe("sm");
		expect(findClassValue("text-2xl", "text-")).toBe("2xl");
		expect(findClassValue("leading-tight", "leading-")).toBe("tight");
	});

	it("returns undefined when the tail carries extra hyphens", () => {
		expect(findClassValue("text-red-500", "text-")).toBeUndefined();
		expect(findClassValue("text", "text-")).toBeUndefined();
		expect(findClassValue("text-sm", "font-")).toBeUndefined();
	});
});
