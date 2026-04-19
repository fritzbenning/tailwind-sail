import type { ClassItem, PanelModal } from "../../types";
import { getEffectiveUtilityFilter } from "../state/getEffectiveUtilityFilter";
import { getEffectiveVariantFilterState } from "../state/getEffectiveVariantFilterState";
import type { FilterState } from "../state/types";
import { isClassMatchingSearchQuery } from "./isClassMatchingSearchQuery";
import { isClassMatchingUtilityFilter } from "./isClassMatchingUtilityFilter";
import { isClassMatchingVariantFilters } from "./isClassMatchingVariantFilters";

/**
 * Whether a single parsed class should be shown given the full filter (utility, variants, search).
 *
 * @example
 * // Input: item matches utility + variants; filterState.classSearch = "flex"
 * // item.fullClass = "md:flex"
 * // Output: true
 *
 * @example
 * // Input: same item; filterState.classSearch = "grid"
 * // Output: false
 */
export function isClassItemVisibleForFilter(
	item: ClassItem,
	panel: PanelModal,
	filterState: FilterState,
): boolean {
	const currentUtilities = getEffectiveUtilityFilter(panel, filterState.utility);
	const currentVariants = getEffectiveVariantFilterState(panel, filterState.variant);
	const q = filterState.classSearch.trim().toLowerCase();
	return (
		isClassMatchingUtilityFilter(item, currentUtilities) &&
		isClassMatchingVariantFilters(item, currentVariants, panel) &&
		isClassMatchingSearchQuery(item, q)
	);
}
