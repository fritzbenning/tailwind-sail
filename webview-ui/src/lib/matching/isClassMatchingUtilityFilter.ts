import type { ClassItem } from "../../types";
import type { UtilityFilter } from "../state/types";

/**
 * Whether a parsed class item passes the utility-chip filter.
 *
 * @example
 * // Input: item.utility = "text", st = { t: "utility", v: "text" }
 * // Output: true
 *
 * @example
 * // Input: item.utility = "flex", st = { t: "utility", v: "text" }
 * // Output: false
 *
 * @example
 * // Input: any item, st = { t: "all" }
 * // Output: true
 */
export function isClassMatchingUtilityFilter(
	item: ClassItem,
	st: UtilityFilter,
): boolean {
	if (st.t === "all") {
		return true;
	}
	if (st.t === "utility") {
		return item.utility === st.v;
	}
	return true;
}
