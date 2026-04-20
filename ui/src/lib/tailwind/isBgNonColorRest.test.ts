import { describe, expect, it } from "vitest";
import { isBgNonColorRest } from "./isBgNonColorRest";

describe("isBgNonColorRest", () => {
	it("flags layout and gradient tails", () => {
		expect(isBgNonColorRest("cover")).toBe(true);
		expect(isBgNonColorRest("gradient-to-r")).toBe(true);
	});

	it("allows palette color tails", () => {
		expect(isBgNonColorRest("red-500")).toBe(false);
	});
});
