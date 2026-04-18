/**
 * `true` for theme variants (`dark:`, `light:`, `theme-…:`).
 *
 * @example
 * // Input: `'dark'`
 * // Output: `true`
 *
 * @example
 * // Input: `'theme-midnight'`
 * // Output: `true`
 */
export function isThemeSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l === "dark" || l === "light" || l.startsWith("theme-");
}
