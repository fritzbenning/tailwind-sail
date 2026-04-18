import { getSegmentForSelection } from './getSegmentForSelection';
import { VARIANT_IDS, type FilterDimensionId } from '../filter/variants';

/** Matches sidebar variant filter state: one selected chip key (or `'all'`) per dimension. */
export type VariantFilterEff = Record<FilterDimensionId, string>;

/**
 * Returns the concatenated Tailwind variant prefix for the active sidebar filters (e.g. `dark:hover:`),
 * in {@link VARIANT_IDS} order. Only dimensions that currently have a filter row in the panel are included.
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
		const sel = variantEff[dim] ?? 'all';
		const seg = getSegmentForSelection(dim, sel);
		if (seg) {
			parts.push(seg);
		}
	}
	return parts.join('');
}
