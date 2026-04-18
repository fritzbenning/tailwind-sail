/**
 * `true` for `aria-…:` variants.
 *
 * @example
 * // Input: `'aria-expanded'`
 * // Output: `true`
 *
 * @example
 * // Input: `'dark'`
 * // Output: `false`
 */
export function isAriaSegment(segment: string): boolean {
	return segment.toLowerCase().startsWith('aria-');
}
