import { describe, expect, it } from "vitest";
import { matchRingOffset } from "./matchRingOffset";

describe("matchRingOffset", () => {
	it("matches ring-offset utilities without arbitrary brackets", () => {
		expect(matchRingOffset("ring-offset-4")).toBe(true);
		expect(matchRingOffset("ring-offset-[2px]")).toBe(false);
	});
});
