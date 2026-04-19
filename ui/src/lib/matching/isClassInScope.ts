import type { ClassItem, PanelModal } from "../../types";
import { getEffectiveUtilityState } from "../state/getEffectiveUtilityState";
import { normalizeVariantState } from "../state/normalizeVariantState";
import type { FilterState } from "../state/types";
import { isClassMatchingSearchQuery } from "./isClassMatchingSearchQuery";
import { isClassMatchingUtilityState } from "./isClassMatchingUtilityState";
import { isClassMatchingVariantState } from "./isClassMatchingVariantState";

/**
 * Whether a single parsed class is in scope for the full filter (utility, variants, search).
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
export function isClassInScope(
	item: ClassItem,
	panel: PanelModal,
	filterState: FilterState,
): boolean {
	const activeUtility = getEffectiveUtilityState(
		panel,
		filterState.activeUtility,
	);

	const activeVariants = normalizeVariantState(
		panel,
		filterState.activeVariants,
	);

	const searchQuery = filterState.search.trim().toLowerCase();

	return (
		isClassMatchingUtilityState(item, activeUtility) &&
		isClassMatchingVariantState(item, activeVariants, panel) &&
		isClassMatchingSearchQuery(item, searchQuery)
	);
}
