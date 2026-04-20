import { VARIANT_IDS } from "@ext/filter";
import type { PanelModal } from "../../types";
import { getEmptyVariantState } from "./getEmptyVariantState";
import { getVariantDimensionsFromPanel } from "./getVariantDimensionsFromPanel";
import type { VariantState } from "./types";

/**
 * Normalizes the client variant map: dimensions the panel does not expose are forced to `"all"`;
 *
 * exposed dimensions keep the client value (or `"all"` if unset).
 *
 * @param panel - Panel model listing visible variant rows.
 * @param variantState - Raw client variant selections.
 * @returns Sanitized {@link VariantState} aligned with the panel.
 *
 * @example normalizeVariantState(panel, { ...state, theme: "dark" }).theme => "all" when the panel has no theme row.
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
