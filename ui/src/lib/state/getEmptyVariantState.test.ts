import { VARIANT_IDS } from "@ext/filter";
import { describe, expect, it } from "vitest";
import { getEmptyVariantState } from "./getEmptyVariantState";

describe("getEmptyVariantState", () => {
	it("sets every dimension to “all”", () => {
		const st = getEmptyVariantState();
		for (const id of VARIANT_IDS) {
			expect(st[id]).toBe("all");
		}
	});
});
