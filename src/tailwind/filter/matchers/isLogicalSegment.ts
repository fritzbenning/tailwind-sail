/**
 * Whether `segment` is a `has-…` / `not-…` logical variant key.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for `has-*` or `not-*` prefixes.
 *
 * @example isLogicalSegment("has-[.x]") => true
 *
 * @example isLogicalSegment("not-hover") => true
 */
export function isLogicalSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l.startsWith("has-") || l.startsWith("not-");
}
