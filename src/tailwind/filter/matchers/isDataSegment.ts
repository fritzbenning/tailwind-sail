/**
 * `true` for `data-…:` attribute variants.
 *
 * @example
 * // Input: `'data-ui-open'`
 * // Output: `true`
 *
 * @example
 * // Input: `'hover'`
 * // Output: `false`
 */
export function isDataSegment(segment: string): boolean {
	return segment.toLowerCase().startsWith("data-");
}
