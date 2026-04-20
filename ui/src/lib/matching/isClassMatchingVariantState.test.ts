import { getEmptyVariantBuckets } from "@ext/filter";
import { describe, expect, it } from "vitest";
import type { ClassItem, PanelModal } from "../../types";
import { getEmptyVariantState } from "../state/getEmptyVariantState";
import { isClassMatchingVariantState } from "./isClassMatchingVariantState";

const panelWithBreakpoints: PanelModal = {
	kind: "panel",
	utilities: [{ id: "flex" }],
	variants: [
		{
			dimension: "breakpoints",
			label: "Breakpoints",
			value: ["md", "lg"],
		},
	],
	showVariantPrefixToggle: true,
	classes: [],
};

describe("isClassMatchingVariantState", () => {
	it("skips dimensions that are not on the panel", () => {
		const buckets = getEmptyVariantBuckets();
		buckets.theme = ["dark"];
		const item: ClassItem = {
			tokenIndex: 0,
			fullClass: "dark:flex",
			utility: "flex",
			variantBuckets: buckets,
		};
		const eff = { ...getEmptyVariantState(), theme: "dark" };
		const panelNoTheme: PanelModal = {
			...panelWithBreakpoints,
			variants: panelWithBreakpoints.variants,
		};
		expect(isClassMatchingVariantState(item, eff, panelNoTheme)).toBe(true);
	});

	it("passes when the narrowed dimension matches the bucket selection", () => {
		const buckets = getEmptyVariantBuckets();
		buckets.breakpoints = ["md"];
		const item: ClassItem = {
			tokenIndex: 0,
			fullClass: "md:flex",
			utility: "flex",
			variantBuckets: buckets,
		};
		const eff = { ...getEmptyVariantState(), breakpoints: "md" };
		expect(isClassMatchingVariantState(item, eff, panelWithBreakpoints)).toBe(
			true,
		);
	});

	it("fails when the class buckets do not satisfy the filter", () => {
		const buckets = getEmptyVariantBuckets();
		buckets.breakpoints = ["lg"];
		const item: ClassItem = {
			tokenIndex: 0,
			fullClass: "lg:flex",
			utility: "flex",
			variantBuckets: buckets,
		};
		const eff = { ...getEmptyVariantState(), breakpoints: "md" };
		expect(isClassMatchingVariantState(item, eff, panelWithBreakpoints)).toBe(
			false,
		);
	});

	it('treats "all" as no narrowing for that dimension', () => {
		const buckets = getEmptyVariantBuckets();
		buckets.breakpoints = ["lg"];
		const item: ClassItem = {
			tokenIndex: 0,
			fullClass: "lg:flex",
			utility: "flex",
			variantBuckets: buckets,
		};
		const eff = { ...getEmptyVariantState(), breakpoints: "all" };
		expect(isClassMatchingVariantState(item, eff, panelWithBreakpoints)).toBe(
			true,
		);
	});
});
