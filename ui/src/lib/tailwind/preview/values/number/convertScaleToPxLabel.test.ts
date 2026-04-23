import { describe, expect, it } from "vitest";
import { convertScaleToPxLabel } from "./convertScaleToPxLabel";

describe("convertScaleToPxLabel", () => {
	it("maps numeric keys with the spacing base (default 4px)", () => {
		expect(convertScaleToPxLabel("4")).toBe("16px");
		expect(convertScaleToPxLabel("3", 5)).toBe("15px");
	});

	it("handles px and zero tokens", () => {
		expect(convertScaleToPxLabel("px")).toBe("1px");
		expect(convertScaleToPxLabel("0")).toBe("0px");
	});

	it("returns undefined for non-numeric keys except px/0", () => {
		expect(convertScaleToPxLabel("sm")).toBeUndefined();
	});
});
