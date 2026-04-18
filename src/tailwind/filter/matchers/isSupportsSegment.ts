/**
 * `true` when the segment is a `@supports` variant (`supports-…:`).
 *
 * @example
 * // Input: `'supports-grid'`
 * // Output: `true`
 *
 * @example
 * // Input: `'grid'`
 * // Output: `false`
 */
export function isSupportsSegment(segment: string): boolean {
	return segment.toLowerCase().startsWith('supports-');
}
