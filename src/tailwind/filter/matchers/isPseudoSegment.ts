import { PSEUDO_EXACT } from "../constants";

/**
 * `true` when the segment is a pseudo-element variant (`before:`, `after:`, …).
 *
 * @example
 * // Input: `'before'`
 * // Output: `true`
 *
 * @example
 * // Input: `'first'` (structural, not pseudo-element here)
 * // Output: `false`
 */
export function isPseudoSegment(segment: string): boolean {
	return PSEUDO_EXACT.has(segment.toLowerCase());
}
