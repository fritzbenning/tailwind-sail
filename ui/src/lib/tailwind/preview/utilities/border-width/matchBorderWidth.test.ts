import { describe, expect, it } from "vitest";
import { matchBorderWidth } from "./matchBorderWidth";

describe("matchBorderWidth", () => {
	it("matches border width utilities without arbitrary brackets", () => {
		expect(matchBorderWidth("border-2")).toBe(true);
		expect(matchBorderWidth("border-[1px]")).toBe(false);
	});
});
