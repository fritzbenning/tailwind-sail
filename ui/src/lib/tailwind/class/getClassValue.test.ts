import { describe, expect, it } from "vitest";
import { getClassValue } from "./getClassValue";

describe("getClassValue", () => {
	it("returns the single-segment suffix after the prefix", () => {
		expect(getClassValue("text-sm", "text-")).toBe("sm");
		expect(getClassValue("text-2xl", "text-")).toBe("2xl");
		expect(getClassValue("leading-tight", "leading-")).toBe("tight");
	});

	it("returns undefined when the suffix has extra hyphens or is empty", () => {
		expect(getClassValue("text-red-500", "text-")).toBeUndefined();
		expect(getClassValue("text", "text-")).toBeUndefined();
		expect(getClassValue("text-sm", "font-")).toBeUndefined();
	});
});
