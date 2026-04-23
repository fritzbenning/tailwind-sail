import { describe, expect, it } from "vitest";
import { matchSpacing } from "./matchSpacing";

describe("matchSpacing", () => {
	it("matches spacing utilities without arbitrary brackets", () => {
		expect(matchSpacing("p-4")).toBe(true);
		expect(matchSpacing("p-[1rem]")).toBe(false);
	});
});
