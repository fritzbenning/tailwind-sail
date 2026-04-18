import type { VariantBuckets } from "../buckets/getEmptyVariantBuckets";

/**
 * `true` when the variant buckets include a `dark` theme segment.
 *
 * @example
 * // Input: `getVariantBuckets(['dark:'])`
 * // Output: `hasDarkTheme(…)` → `true`
 *
 * @example
 * // Input: `getVariantBuckets(['light:'])` (or `[]`)
 * // Output: `hasDarkTheme(…)` → `false`
 */
export function hasDarkTheme(buckets: VariantBuckets): boolean {
	return buckets.theme.includes("dark");
}
