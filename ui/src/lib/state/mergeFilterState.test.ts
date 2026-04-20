import { describe, expect, it } from "vitest";
import { getDefaultFilterState } from "./getDefaultFilterState";
import { mergeFilterState } from "./mergeFilterState";

describe("mergeFilterState", () => {
	it("applies only the fields present in the patch", () => {
		const prev = getDefaultFilterState();
		const next = mergeFilterState(prev, { search: "p-4" });
		expect(next.search).toBe("p-4");
		expect(next.activeUtility).toEqual(prev.activeUtility);
		expect(next.activeVariants).toEqual(prev.activeVariants);
	});

	it("replaces nested objects when provided", () => {
		const prev = getDefaultFilterState();
		const next = mergeFilterState(prev, {
			activeUtility: { kind: "utility", id: "text" },
		});
		expect(next.activeUtility).toEqual({ kind: "utility", id: "text" });
	});
});
