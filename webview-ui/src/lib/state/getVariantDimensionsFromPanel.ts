import type { FilterDimensionId } from "@ext/filter";
import type { SailWebviewPanelModel } from "sail-protocol";

/**
 * Returns the set of variant dimensions that actually appear as filter rows for the current panel.
 *
 * @example
 * // Input panel.variantRows:
 * //   [{ dimension: "screens", values: [...] }, { dimension: "theme", values: [...] }]
 * // Output:
 * //   Set { "screens", "theme" }
 */
export function getVariantDimensionsFromPanel(
	panel: SailWebviewPanelModel,
): Set<FilterDimensionId> {
	return new Set(panel.variantRows.map((r) => r.dimension));
}
