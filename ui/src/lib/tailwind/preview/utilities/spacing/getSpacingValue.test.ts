import { describe, expect, it } from "vitest";
import { getSpacingValue } from "./getSpacingValue";

describe("getSpacingValue", () => {
	it("returns the scale key after the longest utility prefix", () => {
		expect(getSpacingValue("p-4")).toBe("4");
		expect(getSpacingValue("gap-2")).toBe("2");
		expect(getSpacingValue("gap-px")).toBe("px");
	});

	it("returns undefined for bare prefixes", () => {
		expect(getSpacingValue("p")).toBeUndefined();
	});
});
