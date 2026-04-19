import type { SailWebviewClassItem } from "sail-protocol";

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
	item: SailWebviewClassItem,
	queryTrimmedLower: string,
): boolean {
	if (queryTrimmedLower.length === 0) {
		return true;
	}
	return item.fullClass.toLowerCase().includes(queryTrimmedLower);
}
