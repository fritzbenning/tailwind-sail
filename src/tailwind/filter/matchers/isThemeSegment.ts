/**
 * Whether `segment` is `dark`, `light`, or `theme-…`.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for theme-related keys.
 *
 * @example isThemeSegment("dark") => true
 *
 * @example isThemeSegment("theme-midnight") => true
 */
export function isThemeSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l === "dark" || l === "light" || l.startsWith("theme-");
}
