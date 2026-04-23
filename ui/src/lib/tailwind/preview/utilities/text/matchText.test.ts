import { describe, expect, it } from "vitest";
import { matchText } from "./matchText";

describe("matchText", () => {
	it("matches text-* scale utilities without arbitrary brackets", () => {
		expect(matchText("text-sm")).toBe(true);
		expect(matchText("text-[10px]")).toBe(false);
	});
});
