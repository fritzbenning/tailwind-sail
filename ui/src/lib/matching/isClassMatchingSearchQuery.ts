import type { ClassItem } from "../../types";

/**
 * Whether the full class string contains the search substring (already lowercased).
 *
 * @param item - Parsed class row.
 * @param queryTrimmedLower - Search string (trimmed, lowercased); empty matches all.
 * @returns `true` when the substring matches or the query is empty.
 *
 * @example isClassMatchingSearchQuery({ fullClass: "text-red-500", ... }, "red") => true
 * @example isClassMatchingSearchQuery(item, "") => true
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
