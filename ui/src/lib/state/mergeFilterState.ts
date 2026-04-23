import type { FilterState } from "./types";

/**
 * Shallow-merges a partial filter snapshot into the previous state.
 *
 * @param previous - Current filter state.
 * @param patch - Fields to replace; omitted keys keep `previous` values.
 * @returns A new {@link FilterState} object.
 *
 * @example mergeFilterState(prev, { search: "flex" }).search => "flex"
 */
export function mergeFilterState(
	previous: FilterState,
	patch: Partial<FilterState>,
): FilterState {
	return {
		activeUtility: patch.activeUtility ?? previous.activeUtility,
		activeVariants: patch.activeVariants ?? previous.activeVariants,
		search: patch.search ?? previous.search,
		hideVariantPrefixes:
			patch.hideVariantPrefixes ?? previous.hideVariantPrefixes,
	};
}
