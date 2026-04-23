import { describe, expect, it } from "vitest";
import { matchRounded } from "./matchRounded";

describe("matchRounded", () => {
	it("matches rounded utilities without arbitrary brackets", () => {
		expect(matchRounded("rounded-lg")).toBe(true);
		expect(matchRounded("rounded-[1rem]")).toBe(false);
	});
});
