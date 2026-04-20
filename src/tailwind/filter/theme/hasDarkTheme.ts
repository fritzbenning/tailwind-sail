import type { VariantBuckets } from "../buckets/getEmptyVariantBuckets";

/**
 * Whether the variant buckets include a `dark` theme segment.
 *
 * @param buckets - Per-dimension keys for the current class.
 * @returns `true` if `theme` includes `"dark"`.
 *
 * @example hasDarkTheme(getVariantBuckets(["dark:"])) => true
 */
export function hasDarkTheme(buckets: VariantBuckets): boolean {
	return buckets.theme.includes("dark");
}
