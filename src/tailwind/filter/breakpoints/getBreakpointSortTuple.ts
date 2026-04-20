import { BREAKPOINT_NAMES } from "../constants";
import { getBreakpointScaleIndex } from "./getBreakpointScaleIndex";

/**
 * Sort key tuple for a breakpoint filter chip: tier, scale index, max/bare/min variant, tie-break string.
 *
 * @param key - Bare breakpoint id (`md`, `max-lg`, …).
 * @returns Tuple for stable ordering.
 *
 * @example getBreakpointSortTuple("md") => [0, 2, 1, "md"]
 */
export function getBreakpointSortTuple(
	key: string,
): readonly [number, number, number, string] {
	const lower = key.toLowerCase();

	if (lower.startsWith("max-") && !lower.startsWith("max-[")) {
		const name = lower.slice(4);
		const i = getBreakpointScaleIndex(name);
		if (i >= 0) {
			return [0, i, 0, key];
		}
	}
	if (BREAKPOINT_NAMES.has(lower)) {
		const i = getBreakpointScaleIndex(lower);
		if (i >= 0) {
			return [0, i, 1, key];
		}
	}
	if (lower.startsWith("min-") && !lower.startsWith("min-[")) {
		const name = lower.slice(4);
		const i = getBreakpointScaleIndex(name);
		if (i >= 0) {
			return [0, i, 2, key];
		}
	}
	if (lower.startsWith("min-[") || lower.startsWith("max-[")) {
		return [1, 0, 0, key];
	}
	return [2, 0, 0, key];
}
