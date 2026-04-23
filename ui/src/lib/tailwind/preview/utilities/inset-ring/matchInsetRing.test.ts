import { describe, expect, it } from "vitest";
import { matchInsetRing } from "./matchInsetRing";

describe("matchInsetRing", () => {
	it("matches inset-ring utilities without arbitrary brackets", () => {
		expect(matchInsetRing("inset-ring-2")).toBe(true);
		expect(matchInsetRing("inset-ring-[2px]")).toBe(false);
	});
});
