import type { ClientFilterState } from "../types/filterStateTypes";
import { getEmptyVariantFilterState } from "./getEmptyVariantFilterState";

/**
 * Default filter state when the panel loads or after an invalid selection is reset.
 *
 * @example
 * // Input: (none)
 * // Output:
 * // {
 * //   utility: { t: "all" },
 * //   variant: { screens: "all", theme: "all", ... },
 * //   classSearch: "",
 * //   hideMatchingVariantPrefixes: false
 * // }
 */
export function getDefaultFilterState(): ClientFilterState {
	return {
		utility: { t: "all" },
		variant: getEmptyVariantFilterState(),
		classSearch: "",
		hideMatchingVariantPrefixes: false,
	};
}
