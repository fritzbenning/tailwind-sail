import type { ClassItem, PanelModal } from "../../types";
import { getEffectiveUtilityState } from "../state/getEffectiveUtilityState";
import { getEffectiveVariantState } from "../state/getEffectiveVariantState";
import type { FilterState } from "../state/types";
import { isClassMatchingSearchQuery } from "./isClassMatchingSearchQuery";
import { isClassMatchingUtilityState } from "./isClassMatchingUtilityState";
import { isClassMatchingVariantState } from "./isClassMatchingVariantState";

/**
 * Whether a single parsed class should be shown given the full filter (utility, variants, search).
 *
 * @example
 * // Input: item matches utility + variants; filterState.search = "flex"
 * // item.fullClass = "md:flex"
 * // Output: true
 *
 * @example
 * // Input: same item; filterState.search = "grid"
 * // Output: false
 */
export function isClassItemVisibleForFilter(
	item: ClassItem,
	panel: PanelModal,
	filterState: FilterState,
): boolean {
	const currentUtilities = getEffectiveUtilityState(
		panel,
		filterState.activeUtility,
	);
	const currentVariants = getEffectiveVariantState(
		panel,
		filterState.activeVariants,
	);
	const q = filterState.search.trim().toLowerCase();
	return (
		isClassMatchingUtilityState(item, currentUtilities) &&
		isClassMatchingVariantState(item, currentVariants, panel) &&
		isClassMatchingSearchQuery(item, q)
	);
}
