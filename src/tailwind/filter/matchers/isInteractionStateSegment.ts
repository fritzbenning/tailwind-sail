import { INTERACTION_EXACT } from "../constants";

/**
 * `true` for interaction / state variants (`hover:`, `group-hover:`, `peer-focus:`, `in-…`, …).
 * Excludes logical `has-` / `not-` and arbitrary `in-[…]`.
 *
 * @example
 * // Input: `'hover'`
 * // Output: `true`
 *
 * @example
 * // Input: `'group-hover'`
 * // Output: `true`
 *
 * @example
 * // Input: `'has-[.x]'` (logical row)
 * // Output: `false`
 */
export function isInteractionStateSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	if (INTERACTION_EXACT.has(l)) {
		return true;
	}
	if (l.startsWith("group-") || l.startsWith("peer-")) {
		return true;
	}
	if (l.startsWith("inverted-")) {
		return false;
	}
	if (l.startsWith("in-[")) {
		return false;
	}
	if (l.startsWith("in-")) {
		return true;
	}
	return false;
}
