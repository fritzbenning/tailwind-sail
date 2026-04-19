import type { ClassItem } from "../../types";

/**
 * Whether the full class string contains the search substring (already lowercased).
 *
 * @example
 * // Input: item.fullClass = "text-red-500", queryTrimmedLower = "red"
 * // Output: true
 *
 * @example
 * // Input: item.fullClass = "p-4", queryTrimmedLower = ""
 * // Output: true
 */
export function isClassMatchingSearchQuery(
	item: ClassItem,
	queryTrimmedLower: string,
): boolean {
	if (queryTrimmedLower.length === 0) {
		return true;
	}
	return item.fullClass.toLowerCase().includes(queryTrimmedLower);
}
