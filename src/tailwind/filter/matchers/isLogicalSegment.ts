/**
 * `true` for `:has` / `:not` style arbitrary logical variants (`has-…`, `not-…`).
 *
 * @example
 * // Input: `'has-[.x]'`
 * // Output: `true`
 *
 * @example
 * // Input: `'not-hover'`
 * // Output: `true`
 */
export function isLogicalSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l.startsWith("has-") || l.startsWith("not-");
}
