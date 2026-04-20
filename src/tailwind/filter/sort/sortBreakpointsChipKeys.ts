import { compareBreakpointKeys } from "../breakpoints/compareBreakpointKeys";

/**
 * Orders breakpoint toolbar chips: synthetic `base` first, then responsive scale order.
 *
 * @param keys - Raw chip keys from extracted classes.
 * @returns Sorted keys for the filter row.
 *
 * @example sortBreakpointsChipKeys(["md", "base", "sm"]) => ["base", "sm", "md"]
 */
export function sortBreakpointsChipKeys(keys: readonly string[]): string[] {
	const base = "base";
	const hasBase = keys.includes(base);
	const rest = keys.filter((k) => k !== base).sort(compareBreakpointKeys);
	return hasBase ? [base, ...rest] : rest;
}
