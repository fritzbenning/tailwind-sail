import { getEmptyVariantState } from "./getEmptyVariantState";
import type { FilterState } from "./types";

/**
 * Default filter state when the panel loads or after an invalid selection is reset.
 *
 * @example
 * // Input: (none)
 * // Output:
 * // {
 * //   activeUtility: { t: "all" },
 * //   activeVariants: { screens: "all", theme: "all", ... },
 * //   search: "",
 * //   hideMatchingVariantPrefixes: false
 * // }
 */
export function getDefaultFilterState(): FilterState {
	return {
		activeUtility: { t: "all" },
		activeVariants: getEmptyVariantState(),
		search: "",
		hideMatchingVariantPrefixes: false,
	};
}
