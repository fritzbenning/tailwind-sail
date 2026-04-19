import type {
	SailWebviewClassItem,
	SailWebviewPanelModel,
} from "sail-protocol";
import { getEffectiveUtilityFilter } from "../state/getEffectiveUtilityFilter";
import { getEffectiveVariantFilterState } from "../state/getEffectiveVariantFilterState";
import type { ClientFilterState } from "../types/filterStateTypes";
import { isClassMatchingSearchQuery } from "./isClassMatchingSearchQuery";
import { isClassMatchingUtilityFilter } from "./isClassMatchingUtilityFilter";
import { isClassMatchingVariantFilters } from "./isClassMatchingVariantFilters";

/**
 * Whether a single parsed class should be shown given the full client filter (utility, variants, search).
 *
 * @example
 * // Input: item matches utility + variants; st.classSearch = "flex"
 * // item.fullClass = "md:flex"
 * // Output: true
 *
 * @example
 * // Input: same item; st.classSearch = "grid"
 * // Output: false
 */
export function isClassItemVisibleForClientFilter(
	item: SailWebviewClassItem,
	panel: SailWebviewPanelModel,
	st: ClientFilterState,
): boolean {
	const utilEff = getEffectiveUtilityFilter(panel, st.utility);
	const varEff = getEffectiveVariantFilterState(panel, st.variant);
	const q = st.classSearch.trim().toLowerCase();
	return (
		isClassMatchingUtilityFilter(item, utilEff) &&
		isClassMatchingVariantFilters(item, varEff, panel) &&
		isClassMatchingSearchQuery(item, q)
	);
}
