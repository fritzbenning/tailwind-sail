import { BREAKPOINT_NAMES } from "../constants";

/**
 * Whether the segment (no trailing `:`) is a responsive / min-max breakpoint style prefix.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for breakpoint-like keys.
 *
 * @example isBreakpointSegment("md") => true
 *
 * @example isBreakpointSegment("hover") => false
 */
export function isBreakpointSegment(segment: string): boolean {
	const s = segment.toLowerCase();
	if (s.startsWith("min-[") || s.startsWith("max-[")) {
		return true;
	}
	if (BREAKPOINT_NAMES.has(s)) {
		return true;
	}
	if (s.startsWith("min-") || s.startsWith("max-")) {
		const rest = s.slice(4);
		if (!rest.length) {
			return false;
		}
		if (rest.startsWith("[") && rest.endsWith("]")) {
			return true;
		}
		return BREAKPOINT_NAMES.has(rest);
	}
	return false;
}
