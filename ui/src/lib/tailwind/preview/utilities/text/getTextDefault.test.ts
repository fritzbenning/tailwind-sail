import { describe, expect, it } from "vitest";
import { getTextDefault } from "./getTextDefault";

const ctx = { spacingBasePx: 4 };

describe("getTextDefault", () => {
	it("returns px from the default type scale", () => {
		expect(getTextDefault("text-sm", ctx)).toBe("14px");
	});
});
