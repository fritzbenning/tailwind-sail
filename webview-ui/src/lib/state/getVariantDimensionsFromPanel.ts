import type { FilterDimensionId } from "@ext/filter";
import type { PanelModal } from "../../types";

/**
 * Returns the set of variant dimensions configured on the current panel (from `panel.variants`).
 *
 * @example
 * // Input panel.variants:
 * //   [{ dimension: "screens", value: [...] }, { dimension: "theme", value: [...] }]
 * // Output:
 * //   Set { "screens", "theme" }
 */
export function getVariantDimensionsFromPanel(
	panel: PanelModal,
): Set<FilterDimensionId> {
	return new Set(panel.variants.map((variant) => variant.dimension));
}
