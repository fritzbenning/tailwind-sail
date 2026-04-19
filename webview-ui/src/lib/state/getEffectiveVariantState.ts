import { VARIANT_IDS } from "@ext/filter";
import type { PanelModal } from "../../types";
import { getEmptyVariantState } from "./getEmptyVariantState";
import { getVariantDimensionsFromPanel } from "./getVariantDimensionsFromPanel";
import type { VariantState } from "./types";

/**
 * Normalizes the client variant map: dimensions without a row in the panel are forced to `"all"`;
 * dimensions with rows keep the client value (or `"all"` if unset).
 *
 * @example
 * // Input: panel has only a "screens" row, variantState.screens = "md", variantState.theme = "dark"
 * // Output: { ..., screens: "md", theme: "all", ... }  // theme reset because no row
 */
export function getEffectiveVariantState(
	panel: PanelModal,
	variantState: VariantState,
): VariantState {
	const rows = getVariantDimensionsFromPanel(panel);
	const out = getEmptyVariantState();

	for (const id of VARIANT_IDS) {
		out[id] = rows.has(id) ? (variantState[id] ?? "all") : "all";
	}

	return out;
}
