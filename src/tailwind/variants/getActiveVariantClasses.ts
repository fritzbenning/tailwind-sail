import { type FilterDimensionId, VARIANT_IDS } from "../filter/variants";
import { getSegmentForSelection } from "./getSegmentForSelection";

/** Effective variant filter: selected chip key per dimension (`"all"` when none). */
export type VariantFilterEff = Record<FilterDimensionId, string>;

/**
 * Concatenates active variant prefixes in {@link VARIANT_IDS} order (e.g. `dark:hover:`), skipping dimensions with no sidebar row.
 *
 * @param presentRowDimensions - Dimensions that currently show a filter row.
 * @param variantEff - Selected chip key per dimension (`"all"` when unset).
 * @returns Concatenated variant prefix (e.g. `dark:hover:`) in filter order.
 *
 * @example Theme `dark` and state `hover` with both rows present yields `"dark:hover:"` (see `getActiveVariantClasses.test.ts` for full `eff`).
 */
export function getActiveVariantClasses(
	presentRowDimensions: ReadonlySet<FilterDimensionId>,
	variantEff: VariantFilterEff,
): string {
	const parts: string[] = [];

	for (const dim of VARIANT_IDS) {
		if (!presentRowDimensions.has(dim)) {
			continue;
		}
		const selection = variantEff[dim] ?? "all";
		const seg = getSegmentForSelection(dim, selection);
		if (seg) {
			parts.push(seg);
		}
	}
	return parts.join("");
}
