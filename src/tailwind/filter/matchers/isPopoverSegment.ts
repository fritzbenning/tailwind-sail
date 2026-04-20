/**
 * Whether `segment` is `open` or `close` (popover variants).
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for `open` or `close`.
 *
 * @example isPopoverSegment("open") => true
 */
export function isPopoverSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l === "open" || l === "close";
}
