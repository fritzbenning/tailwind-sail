import { FORM_VARIANT_EXACT } from "../constants";

/**
 * `true` when the segment is a form / field pseudo-class variant (`disabled:`, `checked:`, …).
 *
 * @example
 * // Input: `'disabled'` (from `disabled:`)
 * // Output: `true`
 *
 * @example
 * // Input: `'hover'`
 * // Output: `false`
 */
export function isFormVariantSegment(segment: string): boolean {
	return FORM_VARIANT_EXACT.has(segment.toLowerCase());
}
