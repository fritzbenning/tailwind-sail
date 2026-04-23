import { describe, expect, it } from "vitest";
import { getRingOffsetDefault } from "./getRingOffsetDefault";

const ctx = { spacingBasePx: 4 };

describe("getRingOffsetDefault", () => {
	it("returns default px", () => {
		expect(getRingOffsetDefault("ring-offset-2", ctx)).toBe("2px");
	});
});
