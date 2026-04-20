/**
 * Whether `segment` is a `data-…:` variant key.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for `data-*` prefixes.
 *
 * @example isDataSegment("data-ui-open") => true
 *
 * @example isDataSegment("hover") => false
 */
export function isDataSegment(segment: string): boolean {
	return segment.toLowerCase().startsWith("data-");
}
