import { VARIANT_IDS } from "@ext/filter";
import type { PanelModal } from "../../types";
import { getEmptyVariantState } from "./getEmptyVariantState";
import { getVariantDimensionsFromPanel } from "./getVariantDimensionsFromPanel";
import type { VariantState } from "./types";

/**
 * Normalizes the client variant map: dimensions the panel does not expose are forced to `"all"`;
 * exposed dimensions keep the client value (or `"all"` if unset).
 *
 * @example
 * // Input: panel exposes only "screens", variantState.screens = "md", variantState.theme = "dark"
 * // Output: { ..., screens: "md", theme: "all", ... }  // theme reset because not on panel
 */
export function normalizeVariantState(
	panel: PanelModal,
	variantState: VariantState,
): VariantState {
	const variants = getVariantDimensionsFromPanel(panel);
	const out = getEmptyVariantState();

	for (const id of VARIANT_IDS) {
		out[id] = variants.has(id) ? (variantState[id] ?? "all") : "all";
	}

	return out;
}
