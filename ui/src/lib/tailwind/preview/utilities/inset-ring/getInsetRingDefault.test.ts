import { describe, expect, it } from "vitest";
import { getInsetRingDefault } from "./getInsetRingDefault";

const ctx = { spacingBasePx: 4 };

describe("getInsetRingDefault", () => {
	it("returns default px", () => {
		expect(getInsetRingDefault("inset-ring-2", ctx)).toBe("2px");
	});
});
