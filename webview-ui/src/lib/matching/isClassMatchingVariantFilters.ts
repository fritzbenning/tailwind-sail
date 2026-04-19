import { variantBucketMatchesSelection, VARIANT_IDS } from "@ext/filter";
import type {
	SailWebviewClassItem,
	SailWebviewPanelModel,
} from "sail-protocol";
import type { VariantFilterState } from "../types/filterStateTypes";
import { getVariantDimensionsFromPanel } from "../state/getVariantDimensionsFromPanel";

/**
 * Whether the class’s variant buckets satisfy every narrowed dimension in the filter.
 *
 * @example
 * // Input: variantEff.screens = "md", item.variantBuckets.screens = ["md"]
 * // Output: true
 *
 * @example
 * // Input: variantEff.screens = "md", item.variantBuckets.screens = ["lg"]
 * // Output: false
 */
export function isClassMatchingVariantFilters(
	item: SailWebviewClassItem,
	variantEff: VariantFilterState,
	panel: SailWebviewPanelModel,
): boolean {
	const rows = getVariantDimensionsFromPanel(panel);
	const buckets = item.variantBuckets;
	for (const dim of VARIANT_IDS) {
		if (!rows.has(dim)) {
			continue;
		}
		const sel = variantEff[dim] ?? "all";
		if (sel === "all") {
			continue;
		}
		const arr = buckets[dim] ?? [];
		if (!variantBucketMatchesSelection(dim, sel, arr)) {
			return false;
		}
	}
	return true;
}
