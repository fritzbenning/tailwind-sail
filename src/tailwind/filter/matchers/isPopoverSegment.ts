/**
 * `true` for popover open/close variants.
 *
 * @example
 * // Input: `'open'`
 * // Output: `true`
 *
 * @example
 * // Input: `'close'`
 * // Output: `true`
 */
export function isPopoverSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l === "open" || l === "close";
}
