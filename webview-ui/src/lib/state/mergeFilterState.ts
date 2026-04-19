import type { FilterState } from "./types";

export function mergeFilterState(
	previous: FilterState,
	patch: Partial<FilterState>,
): FilterState {
	return {
		utility: patch.utility ?? previous.utility,
		variant: patch.variant ?? previous.variant,
		classSearch: patch.classSearch ?? previous.classSearch,
		hideMatchingVariantPrefixes:
			patch.hideMatchingVariantPrefixes ?? previous.hideMatchingVariantPrefixes,
	};
}
