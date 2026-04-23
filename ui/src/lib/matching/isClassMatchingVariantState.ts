import { VARIANT_IDS, variantBucketMatchesSelection } from "@ext/filter";
import type { ClassItem, PanelModal } from "../../types";
import { getVariantDimensionsFromPanel } from "../state/getVariantDimensionsFromPanel";
import type { VariantState } from "../state/types";

/**
 * Whether the class’s variant buckets satisfy every narrowed dimension in the filter.
 *
 * @param item - Parsed class with `variantBuckets`.
 * @param variantEff - Client variant selections per dimension.
 * @param panel - Panel model (row visibility).
 * @returns `true` when every non-`all` dimension matches buckets.
 *
 * @example isClassMatchingVariantState(item, variantEff, panel) => true when every narrowed dimension matches `item.variantBuckets`.
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
		const selection = variantEff[dim] ?? "all";
		if (selection === "all") {
			continue;
		}
		const arr = buckets[dim] ?? [];
		if (!variantBucketMatchesSelection(dim, selection, arr)) {
			return false;
		}
	}
	return true;
}
