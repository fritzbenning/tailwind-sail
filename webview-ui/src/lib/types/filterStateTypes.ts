import type { FilterDimensionId } from "@ext/filter";

/** Client-side utility chip filter: all utilities, or a single Tailwind utility id. */
export type UtilityFilter = { t: "all" } | { t: "utility"; v: string };

/** Per-dimension variant selection: `"all"` or a concrete variant value id from the panel. */
export type VariantFilterState = Record<FilterDimensionId, string>;

/**
 * Full client filter state for the parsed-classes panel (utility chips, variant rows, search, display toggle).
 */
export interface ClientFilterState {
	utility: UtilityFilter;
	variant: VariantFilterState;
	classSearch: string;
	hideMatchingVariantPrefixes: boolean;
}
