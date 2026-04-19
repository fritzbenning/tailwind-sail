import type { ClassItem } from "../../types";
import type { UtilityState } from "../state/types";

/**
 * Whether a parsed class item passes the utility-chip filter.
 *
 * @example
 * // Input: item.utility = "text", utilityState = { kind: "utility", id: "text" }
 * // Output: true
 *
 * @example
 * // Input: item.utility = "flex", utilityState = { kind: "utility", id: "text" }
 * // Output: false
 *
 * @example
 * // Input: any item, utilityState = { kind: "all" }
 * // Output: true
 */
export function isClassMatchingUtilityState(
	item: ClassItem,
	utilityState: UtilityState,
): boolean {
	if (utilityState.kind === "all") {
		return true;
	}
	return item.utility === utilityState.id;
}
