import { getEmptyVariantState } from "./getEmptyVariantState";
import type { FilterState } from "./types";

/**
 * Default filter state when the panel loads or after an invalid selection is reset.
 *
 * @example
 * // Input: (none)
 * // Output:
 * // {
 * //   activeUtility: { kind: "all" },
 * //   activeVariants: { screens: "all", theme: "all", ... },
 * //   search: "",
 * //   hideVariantPrefixes: false
 * // }
 */
export function getDefaultFilterState(): FilterState {
	return {
		activeUtility: { kind: "all" },
		activeVariants: getEmptyVariantState(),
		search: "",
		hideVariantPrefixes: false,
	};
}
