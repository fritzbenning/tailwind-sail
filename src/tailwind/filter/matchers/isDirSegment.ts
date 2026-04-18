/**
 * `true` for direction variants `ltr:` / `rtl:`.
 *
 * @example
 * // Input: `'rtl'`
 * // Output: `true`
 *
 * @example
 * // Input: `'ltr'`
 * // Output: `true`
 */
export function isDirSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l === 'ltr' || l === 'rtl';
}
