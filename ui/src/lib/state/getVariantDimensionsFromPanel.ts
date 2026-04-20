import type { FilterDimensionId } from "@ext/filter";
import type { PanelModal } from "../../types";

/**
 * Returns the set of variant dimensions configured on the current panel (from `panel.variants`).
 *
 * @param panel - Panel model from the extension.
 * @returns Set of dimension ids exposed in the UI.
 *
 * @example getVariantDimensionsFromPanel({ variants: [{ dimension: "breakpoints", value: [] }] }).has("breakpoints") => true
 */
export function getVariantDimensionsFromPanel(
	panel: PanelModal,
): Set<FilterDimensionId> {
	return new Set(panel.variants.map((variant) => variant.dimension));
}
