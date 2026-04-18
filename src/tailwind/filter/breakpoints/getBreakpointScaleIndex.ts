import { BREAKPOINT_SCALE_ORDER } from "../constants";

/**
 * Index of a named breakpoint in {@link BREAKPOINT_SCALE_ORDER}, or `-1` if unknown.
 *
 * @example
 * // Input: `'md'`
 * // Output: `2`
 *
 * @example
 * // Input: `'unknown'`
 * // Output: `-1`
 */
export function getBreakpointScaleIndex(name: string): number {
	return BREAKPOINT_SCALE_ORDER.indexOf(
		name.toLowerCase() as (typeof BREAKPOINT_SCALE_ORDER)[number],
	);
}
