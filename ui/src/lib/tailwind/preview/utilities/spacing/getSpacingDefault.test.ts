import { describe, expect, it } from "vitest";
import { getSpacingDefault } from "./getSpacingDefault";

const ctx = { spacingBasePx: 4 };

describe("getSpacingDefault", () => {
	it("converts scale keys to px labels", () => {
		expect(getSpacingDefault("p-4", ctx)).toBe("16px");
	});
});
