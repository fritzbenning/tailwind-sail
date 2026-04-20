import { describe, expect, it } from "vitest";
import type { PanelModal } from "../../types";
import { getEffectiveUtilityState } from "./getEffectiveUtilityState";
import type { UtilityState } from "./types";

const emptyPanel: PanelModal = {
	kind: "panel",
	utilities: [],
	variants: [],
	showVariantPrefixToggle: false,
	classes: [],
};

const panelWithChips: PanelModal = {
	...emptyPanel,
	utilities: [{ id: "text" }],
};

describe("getEffectiveUtilityState", () => {
	it("forces “all” when the panel lists no utility chips", () => {
		const requested: UtilityState = { kind: "utility", id: "text" };
		expect(getEffectiveUtilityState(emptyPanel, requested)).toEqual({
			kind: "all",
		});
	});

	it("returns the client selection when chips exist", () => {
		const requested: UtilityState = { kind: "utility", id: "text" };
		expect(getEffectiveUtilityState(panelWithChips, requested)).toEqual(
			requested,
		);
	});
});
