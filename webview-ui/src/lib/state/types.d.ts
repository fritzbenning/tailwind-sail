import type { FilterDimensionId } from "@ext/filter";

export type UtilityState = { t: "all" } | { t: "utility"; v: string };

export type VariantState = Record<FilterDimensionId, string>;

export interface FilterState {
	activeUtility: UtilityState;
	activeVariants: VariantState;
	search: string;
	hideMatchingVariantPrefixes: boolean;
}
