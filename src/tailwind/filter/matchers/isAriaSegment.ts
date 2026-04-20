/**
 * Whether `segment` is an `aria-…:` variant key (prefix without colon).
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for `aria-*` prefixes.
 *
 * @example isAriaSegment("aria-expanded") => true
 *
 * @example isAriaSegment("dark") => false
 */
export function isAriaSegment(segment: string): boolean {
	return segment.toLowerCase().startsWith("aria-");
}
