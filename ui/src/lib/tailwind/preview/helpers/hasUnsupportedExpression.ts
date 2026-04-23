/**
 * Whether a resolved value still contains `calc(` or `var(` (not safe for a plain px label).
 *
 * @param value - CSS custom property value.
 * @returns `true` when `calc(` or `var(` appears in `value`.
 *
 * @example hasUnsupportedExpression("12px") => false
 * @example hasUnsupportedExpression("var(--x)") => true
 * @example hasUnsupportedExpression("calc(100% - 1rem)") => true
 */
export function hasUnsupportedExpression(value: string): boolean {
	return /calc\(/i.test(value) || /var\(/i.test(value);
}
