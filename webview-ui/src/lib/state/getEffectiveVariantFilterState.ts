import { VARIANT_IDS } from "@ext/filter";
import type { SailWebviewPanelModel } from "sail-protocol";
import type { VariantFilterState } from "../types/filterStateTypes";
import { getEmptyVariantFilterState } from "./getEmptyVariantFilterState";
import { getVariantDimensionsFromPanel } from "./getVariantDimensionsFromPanel";

/**
 * Normalizes the client variant map: dimensions without a row in the panel are forced to `"all"`;
 * dimensions with rows keep the client value (or `"all"` if unset).
 *
 * @example
 * // Input: panel has only a "screens" row, variantSt.screens = "md", variantSt.theme = "dark"
 * // Output: { ..., screens: "md", theme: "all", ... }  // theme reset because no row
 */
export function getEffectiveVariantFilterState(
	panel: SailWebviewPanelModel,
	variantSt: VariantFilterState,
): VariantFilterState {
	const rows = getVariantDimensionsFromPanel(panel);
	const out = getEmptyVariantFilterState();
	for (const id of VARIANT_IDS) {
		out[id] = rows.has(id) ? (variantSt[id] ?? "all") : "all";
	}
	return out;
}
