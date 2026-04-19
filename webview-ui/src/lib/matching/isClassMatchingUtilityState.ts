import type { ClassItem } from "../../types";
import type { UtilityState } from "../state/types";

/**
 * Whether a parsed class item passes the utility-chip filter.
 *
 * @example
 * // Input: item.utility = "text", utilityState = { t: "utility", v: "text" }
 * // Output: true
 *
 * @example
 * // Input: item.utility = "flex", utilityState = { t: "utility", v: "text" }
 * // Output: false
 *
 * @example
 * // Input: any item, utilityState = { t: "all" }
 * // Output: true
 */
export function isClassMatchingUtilityState(
	item: ClassItem,
	utilityState: UtilityState,
): boolean {
	if (utilityState.t === "all") {
		return true;
	}
	if (utilityState.t === "utility") {
		return item.utility === utilityState.v;
	}
	return true;
}
