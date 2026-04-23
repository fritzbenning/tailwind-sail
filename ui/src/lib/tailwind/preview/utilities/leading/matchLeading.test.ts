import { describe, expect, it } from "vitest";
import { matchLeading } from "./matchLeading";

describe("matchLeading", () => {
	it("matches leading-* without arbitrary brackets", () => {
		expect(matchLeading("leading-tight")).toBe(true);
		expect(matchLeading("leading-[1.2]")).toBe(false);
	});
});
