import { BREAKPOINT_SCALE_ORDER } from "../constants";

/**
 * Index of a named breakpoint in {@link BREAKPOINT_SCALE_ORDER}, or `-1` if unknown.
 *
 * @param name - Breakpoint name without variant prefix.
 * @returns Index in the scale, or `-1`.
 *
 * @example getBreakpointScaleIndex("md") => 2
 *
 * @example getBreakpointScaleIndex("unknown") => -1
 */
export function getBreakpointScaleIndex(name: string): number {
	return BREAKPOINT_SCALE_ORDER.indexOf(
		name.toLowerCase() as (typeof BREAKPOINT_SCALE_ORDER)[number],
	);
}
