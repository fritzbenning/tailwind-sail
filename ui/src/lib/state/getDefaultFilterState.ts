import { getEmptyVariantState } from "./getEmptyVariantState";
import type { FilterState } from "./types";

/**
 * Default filter state when the panel loads or after an invalid selection is reset.
 *
 * @returns Fresh {@link FilterState} with all variants `"all"` and empty search.
 *
 * @example getDefaultFilterState().search => ""
 */
export function getDefaultFilterState(): FilterState {
	return {
		activeUtility: { kind: "all" },
		activeVariants: getEmptyVariantState(),
		search: "",
		hideVariantPrefixes: false,
	};
}
