import type { ClassItem, PanelModal } from "../../types";
import { getEffectiveUtilityState } from "../state/getEffectiveUtilityState";
import { getEffectiveVariantState } from "../state/getEffectiveVariantState";
import type { FilterState } from "../state/types";
import { isClassMatchingSearchQuery } from "./isClassMatchingSearchQuery";
import { isClassMatchingUtilityState } from "./isClassMatchingUtilityState";
import { isClassMatchingVariantState } from "./isClassMatchingVariantState";

/**
 * Whether a single parsed class should be shown given the full client filter (utility, variants, search).
 *
 * @example
 * // Input: item matches utility + variants; st.search = "flex"
 * // item.fullClass = "md:flex"
 * // Output: true
 *
 * @example
 * // Input: same item; st.search = "grid"
 * // Output: false
 */
export function isClassItemVisibleForClientFilter(
	item: ClassItem,
	panel: PanelModal,
	st: FilterState,
): boolean {
	const utilEff = getEffectiveUtilityState(panel, st.activeUtility);
	const varEff = getEffectiveVariantState(panel, st.activeVariants);
	const queryTrimmedLower = st.search.trim().toLowerCase();
	return (
		isClassMatchingUtilityState(item, utilEff) &&
		isClassMatchingVariantState(item, varEff, panel) &&
		isClassMatchingSearchQuery(item, queryTrimmedLower)
	);
}
