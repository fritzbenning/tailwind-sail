import type { FilterDimensionId } from "./variants";

/**
 * Whether a class's bucket keys for `dimension` satisfy the sidebar filter value `selection`
 * (when `selection` is not `'all'` — callers typically skip `'all'`).
 *
 * @param dimension - Filter row dimension.
 * @param selection - Active chip key (not `'all'`).
 * @param bucketKeys - Keys present on the class for that dimension.
 * @returns Whether the class matches the filter.
 *
 * @example variantBucketMatchesSelection("state", "hover", ["hover"]) => true
 */
export function variantBucketMatchesSelection(
	dimension: FilterDimensionId,
	selection: string,
	bucketKeys: readonly string[],
): boolean {
	const keys = bucketKeys;
	if (dimension === "state" && selection === "idle") {
		return keys.length === 0;
	}
	if (dimension === "theme" && selection === "light") {
		return !keys.includes("dark");
	}
	if (dimension === "breakpoints" && selection === "base") {
		return keys.length === 0;
	}
	if (dimension === "container" && selection === "base") {
		return keys.length === 0;
	}
	return keys.includes(selection);
}
