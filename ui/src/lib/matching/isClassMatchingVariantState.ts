import { VARIANT_IDS, variantBucketMatchesSelection } from "@ext/filter";
import type { ClassItem, PanelModal } from "../../types";
import { getVariantDimensionsFromPanel } from "../state/getVariantDimensionsFromPanel";
import type { VariantState } from "../state/types";

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
export function isClassMatchingVariantState(
	item: ClassItem,
	variantEff: VariantState,
	panel: PanelModal,
): boolean {
	const variants = getVariantDimensionsFromPanel(panel);
	const buckets = item.variantBuckets;
	for (const dim of VARIANT_IDS) {
		if (!variants.has(dim)) {
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
