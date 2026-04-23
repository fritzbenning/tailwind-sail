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
 * @param item - Parsed class row from the snapshot.
 * @param panel - Panel model for effective filters.
 * @param filterState - Client utility, variant, and search state.
 * @returns `true` when utility, variant, and search predicates all pass.
 *
 * @example isClassInScope(item, panel, filterState) => true when utility, variants, and search all pass.
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
