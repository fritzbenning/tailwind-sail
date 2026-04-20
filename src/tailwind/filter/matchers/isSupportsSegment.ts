/**
 * Whether `segment` is a `supports-…:` variant key.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` when the segment starts with `supports-`.
 *
 * @example isSupportsSegment("supports-grid") => true
 *
 * @example isSupportsSegment("grid") => false
 */
export function isSupportsSegment(segment: string): boolean {
	return segment.toLowerCase().startsWith("supports-");
}
