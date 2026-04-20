import { describe, expect, it } from "vitest";
import type { PanelModal } from "../../types";
import { getDefaultFilterState } from "./getDefaultFilterState";
import { mergeFilterState } from "./mergeFilterState";
import { validateFilterState } from "./validateFilterState";

const panel: PanelModal = {
	kind: "panel",
	utilities: [{ id: "text" }],
	variants: [
		{
			dimension: "breakpoints",
			label: "Breakpoints",
			value: ["md"],
		},
	],
	showVariantPrefixToggle: false,
	classes: [],
};

describe("validateFilterState", () => {
	it("returns true when the utility id exists on the panel", () => {
		const st = mergeFilterState(getDefaultFilterState(), {
			activeUtility: { kind: "utility", id: "text" },
			activeVariants: {
				...getDefaultFilterState().activeVariants,
				breakpoints: "md",
			},
		});
		expect(validateFilterState(panel, st)).toBe(true);
	});

	it("returns false when the utility id is missing from the panel", () => {
		const st = mergeFilterState(getDefaultFilterState(), {
			activeUtility: { kind: "utility", id: "bogus" },
		});
		expect(validateFilterState(panel, st)).toBe(false);
	});

	it("returns false when a narrowed variant value is not in the row", () => {
		const st = mergeFilterState(getDefaultFilterState(), {
			activeVariants: {
				...getDefaultFilterState().activeVariants,
				breakpoints: "lg",
			},
		});
		expect(validateFilterState(panel, st)).toBe(false);
	});
});
