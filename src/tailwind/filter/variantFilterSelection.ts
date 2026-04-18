import type { FilterDimensionId } from "./variants";

/**
 * Whether a class's bucket keys for `dimension` satisfy the sidebar filter value `sel`
 * (when `sel` is not `'all'` — callers typically skip `'all'`).
 */
export function variantBucketMatchesSelection(
	dimension: FilterDimensionId,
	sel: string,
	bucketKeys: readonly string[],
): boolean {
	const keys = bucketKeys;
	if (dimension === "state" && sel === "idle") {
		return keys.length === 0;
	}
	if (dimension === "theme" && sel === "light") {
		return !keys.includes("dark");
	}
	if (dimension === "breakpoints" && sel === "base") {
		return keys.length === 0;
	}
	if (dimension === "container" && sel === "base") {
		return keys.length === 0;
	}
	return keys.includes(sel);
}

/**
 * When hiding matching variant prefixes in the class list, strip a modifier segment whose
 * classified key equals the selected filter value — except for synthetic selections that do not
 * name a real prefix (idle / base).
 */
export function shouldStripModifierForVariantFilter(
	sel: string,
	dimension: FilterDimensionId,
	classifiedModifierKey: string,
): boolean {
	if (sel === "all") {
		return false;
	}
	if (dimension === "state" && sel === "idle") {
		return false;
	}
	if (dimension === "breakpoints" && sel === "base") {
		return false;
	}
	if (dimension === "container" && sel === "base") {
		return false;
	}
	return sel === classifiedModifierKey;
}
