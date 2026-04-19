import type { FilterState } from "./types";

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
