import { INTERACTION_EXACT } from "../constants";

/**
 * Whether `segment` is a state/interaction variant key (`hover`, `group-…`, `peer-…`, `in-…`, …). Excludes `has-` / `not-` and `in-[…]`.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for state-row interaction variants.
 *
 * @example isInteractionStateSegment("hover") => true
 *
 * @example isInteractionStateSegment("group-hover") => true
 * @example isInteractionStateSegment("has-[.x]") => false
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
