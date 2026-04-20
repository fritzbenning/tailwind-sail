import { getBreakpointSortTuple } from "./getBreakpointSortTuple";

/**
 * Comparator for breakpoint chip keys: responsive scale order, not alphabetical (`lg` after `md`).
 *
 * The synthetic `base` chip is handled in {@link sortBreakpointsChipKeys}, not here.
 *
 * @param a - First breakpoint chip key.
 * @param b - Second breakpoint chip key.
 * @returns Negative if `a` sorts before `b`, positive if after, `0` if equal tier.
 *
 * @example compareBreakpointKeys("lg", "md") => negative
 * @example compareBreakpointKeys("sm", "sm") => 0
 */
export function compareBreakpointKeys(a: string, b: string): number {
	const ta = getBreakpointSortTuple(a);
	const tb = getBreakpointSortTuple(b);
	if (ta[0] !== tb[0]) {
		return ta[0] - tb[0];
	}
	if (ta[1] !== tb[1]) {
		return ta[1] - tb[1];
	}
	if (ta[2] !== tb[2]) {
		return ta[2] - tb[2];
	}
	return ta[3].localeCompare(tb[3], undefined, { numeric: true });
}
