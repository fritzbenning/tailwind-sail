import type { FilterDimensionId } from "../variants";

/** Per-dimension variant keys (no trailing `:`) for one class. */
export type VariantBuckets = Record<FilterDimensionId, string[]>;

/**
 * Fresh bucket map with every dimension set to `[]`.
 *
 * @returns Empty `VariantBuckets` object.
 *
 * @example getEmptyVariantBuckets().state.length => 0
 */
export function getEmptyVariantBuckets(): VariantBuckets {
	return {
		aria: [],
		breakpoints: [],
		container: [],
		data: [],
		dir: [],
		form: [],
		logical: [],
		media: [],
		misc: [],
		other: [],
		popover: [],
		pseudo: [],
		state: [],
		structural: [],
		supports: [],
		theme: [],
	};
}
