import { describe, expect, it } from "vitest";
import { getLeadingDefault } from "./getLeadingDefault";

const ctx = { spacingBasePx: 4 };

describe("getLeadingDefault", () => {
	it("returns preset relative values", () => {
		expect(getLeadingDefault("leading-tight", ctx)).toBe("1.25");
	});

	it("falls back to spacing-scale px for numeric keys", () => {
		expect(getLeadingDefault("leading-6", ctx)).toBe("24px");
	});
});
