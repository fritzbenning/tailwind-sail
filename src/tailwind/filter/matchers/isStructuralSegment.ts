import { STRUCTURAL_EXACT } from "../constants";

/**
 * `true` for structural / sibling-order style variants (`first:`, `nth-…`, …).
 *
 * @example
 * // Input: `'first'`
 * // Output: `true`
 *
 * @example
 * // Input: `'nth-2'`
 * // Output: `true`
 */
export function isStructuralSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	if (STRUCTURAL_EXACT.has(l)) {
		return true;
	}
	return l.startsWith("nth-");
}
