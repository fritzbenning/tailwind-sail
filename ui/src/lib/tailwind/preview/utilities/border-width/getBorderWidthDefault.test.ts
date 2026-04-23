import { describe, expect, it } from "vitest";
import { getBorderWidthDefault } from "./getBorderWidthDefault";

const ctx = { spacingBasePx: 4 };

describe("getBorderWidthDefault", () => {
	it("returns default px for width utilities", () => {
		expect(getBorderWidthDefault("border", ctx)).toBe("1px");
		expect(getBorderWidthDefault("border-x", ctx)).toBe("1px");
		expect(getBorderWidthDefault("border-t-2", ctx)).toBe("2px");
	});
});
