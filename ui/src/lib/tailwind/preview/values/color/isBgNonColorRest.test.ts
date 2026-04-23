import { describe, expect, it } from "vitest";
import { isBgNonColorRest } from "./isBgNonColorRest";

describe("isBgNonColorRest", () => {
	it("detects non-color background tails", () => {
		expect(isBgNonColorRest("cover")).toBe(true);
		expect(isBgNonColorRest("gradient-to-r")).toBe(true);
	});

	it("returns false for palette color tails", () => {
		expect(isBgNonColorRest("red-500")).toBe(false);
	});
});
