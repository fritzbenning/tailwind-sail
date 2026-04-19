import type { FilterDimensionId } from "@ext/filter";
import type { PanelModal } from "../../types";

/**
 * Returns the set of variant dimensions that actually appear as filter rows for the current panel.
 *
 * @example
 * // Input panel.variants:
 * //   [{ dimension: "screens", values: [...] }, { dimension: "theme", values: [...] }]
 * // Output:
 * //   Set { "screens", "theme" }
 */
export function getVariantDimensionsFromPanel(
	panel: PanelModal,
): Set<FilterDimensionId> {
	return new Set(panel.variants.map((r) => r.dimension));
}
