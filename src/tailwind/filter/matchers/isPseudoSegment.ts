import { PSEUDO_EXACT } from "../constants";

/**
 * Whether `segment` is a pseudo-element variant key (`before`, `after`, …).
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` when listed in {@link PSEUDO_EXACT}.
 *
 * @example isPseudoSegment("before") => true
 *
 * @example isPseudoSegment("first") => false
 */
export function isPseudoSegment(segment: string): boolean {
	return PSEUDO_EXACT.has(segment.toLowerCase());
}
