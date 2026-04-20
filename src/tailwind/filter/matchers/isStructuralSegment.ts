import { STRUCTURAL_EXACT } from "../constants";

/**
 * Whether `segment` is a structural / sibling-order variant key (`first`, `nth-…`, …).
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for structural or `nth-*` keys.
 *
 * @example isStructuralSegment("first") => true
 *
 * @example isStructuralSegment("nth-2") => true
 */
export function isStructuralSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	if (STRUCTURAL_EXACT.has(l)) {
		return true;
	}
	return l.startsWith("nth-");
}
