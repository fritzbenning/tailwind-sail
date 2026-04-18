import type { FilterDimensionId } from '../variants';

/**
 * Per-dimension lists of unique variant keys (no trailing `:`) for one class’s modifiers.
 *
 * @example
 * // Input: `getVariantBuckets(['dark:', 'md:', 'hover:'])`
 * // Output: `{ theme: ['dark'], breakpoints: ['md'], state: ['hover'], … }` (other keys `[]`)
 */
export type VariantBuckets = Record<FilterDimensionId, string[]>;

/**
 * Empty bucket map: every dimension starts with an empty array.
 *
 * @example
 * // Input: `getEmptyVariantBuckets().state`
 * // Output: `[]`
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
