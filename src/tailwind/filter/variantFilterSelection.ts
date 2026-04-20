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

/**
 * When hiding matching variant prefixes in the class list, strip a modifier segment whose
 * classified key equals the selected filter value — except for synthetic selections that do not
 * name a real prefix (idle / base).
 *
 * @param selection - Active filter chip key.
 * @param dimension - Dimension of the modifier.
 * @param classifiedModifierKey - Key from {@link classifyVariantModifier}.
 * @returns Whether to strip this modifier for display.
 *
 * @example shouldStripModifierForVariantFilter("hover", "state", "hover") => true
 */
export function shouldStripModifierForVariantFilter(
	selection: string,
	dimension: FilterDimensionId,
	classifiedModifierKey: string,
): boolean {
	if (selection === "all") {
		return false;
	}
	if (dimension === "state" && selection === "idle") {
		return false;
	}
	if (dimension === "breakpoints" && selection === "base") {
		return false;
	}
	if (dimension === "container" && selection === "base") {
		return false;
	}
	return selection === classifiedModifierKey;
}
