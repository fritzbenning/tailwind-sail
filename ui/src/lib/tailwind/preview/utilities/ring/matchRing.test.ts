import { describe, expect, it } from "vitest";
import { matchRing } from "./matchRing";

describe("matchRing", () => {
	it("matches ring width utilities without arbitrary brackets", () => {
		expect(matchRing("ring-2")).toBe(true);
		expect(matchRing("ring-[2px]")).toBe(false);
	});
});
