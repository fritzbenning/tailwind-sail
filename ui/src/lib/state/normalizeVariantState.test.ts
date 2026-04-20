import { describe, expect, it } from "vitest";
import type { PanelModal } from "../../types";
import { getEmptyVariantState } from "./getEmptyVariantState";
import { normalizeVariantState } from "./normalizeVariantState";
import type { VariantState } from "./types";

const panelBreakpointsOnly: PanelModal = {
	kind: "panel",
	utilities: [],
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

describe("normalizeVariantState", () => {
	it("forces dimensions off the panel back to “all”", () => {
		const client = {
			...getEmptyVariantState(),
			theme: "dark",
			breakpoints: "md",
		};
		const norm = normalizeVariantState(panelBreakpointsOnly, client);
		expect(norm.theme).toBe("all");
		expect(norm.breakpoints).toBe("md");
	});

	it("fills missing exposed keys with “all”", () => {
		const { breakpoints: _omit, ...client } = getEmptyVariantState();
		const norm = normalizeVariantState(
			panelBreakpointsOnly,
			client as VariantState,
		);
		expect(norm.breakpoints).toBe("all");
	});
});
