import { getEmptyVariantBuckets } from "@ext/filter";
import { describe, expect, it } from "vitest";
import type { ClassItem, PanelModal } from "../../types";
import { getDefaultFilterState } from "../state/getDefaultFilterState";
import { mergeFilterState } from "../state/mergeFilterState";
import type { FilterState } from "../state/types";
import { isClassInScope } from "./isClassInScope";

const panel: PanelModal = {
	kind: "panel",
	utilities: [{ id: "flex" }, { id: "text" }],
	variants: [
		{
			dimension: "breakpoints",
			label: "Breakpoints",
			value: ["md", "lg"],
		},
	],
	showVariantPrefixToggle: false,
	classes: [],
};

const flexItem: ClassItem = {
	tokenIndex: 0,
	fullClass: "md:flex",
	utility: "flex",
	variantBuckets: (() => {
		const b = getEmptyVariantBuckets();
		b.breakpoints = ["md"];
		return b;
	})(),
};

describe("isClassInScope", () => {
	it("returns true when utility, variants, and search all agree", () => {
		const base = getDefaultFilterState();
		const filterState: FilterState = mergeFilterState(base, {
			activeUtility: { kind: "utility", id: "flex" },
			search: "flex",
		});
		expect(isClassInScope(flexItem, panel, filterState)).toBe(true);
	});

	it("returns false when the search does not match", () => {
		const base = getDefaultFilterState();
		const filterState: FilterState = mergeFilterState(base, {
			activeUtility: { kind: "utility", id: "flex" },
			search: "grid",
		});
		expect(isClassInScope(flexItem, panel, filterState)).toBe(false);
	});

	it("returns false when the utility chip does not match", () => {
		const base = getDefaultFilterState();
		const filterState: FilterState = mergeFilterState(base, {
			activeUtility: { kind: "utility", id: "text" },
			search: "flex",
		});
		expect(isClassInScope(flexItem, panel, filterState)).toBe(false);
	});
});
