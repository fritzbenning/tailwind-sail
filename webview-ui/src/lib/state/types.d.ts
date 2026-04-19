import type { FilterDimensionId } from "@ext/filter";

export type UtilityState =
	| { kind: "all" }
	| { kind: "utility"; id: string };

export type VariantState = Record<FilterDimensionId, string>;

export interface FilterState {
	activeUtility: UtilityState;
	activeVariants: VariantState;
	search: string;
	hideMatchingVariantPrefixes: boolean;
}
