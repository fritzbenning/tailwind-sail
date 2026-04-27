import { isGapUtility } from "@ext/filter/isGapUtility";
import { prepareTailwindClassForFilter } from "@ext/variants/prepareTailwindClassForFilter";
import type { ClassItem } from "../../types";
import type { UtilityState } from "../state/types";

/**
 * Whether a parsed class item passes the utility-chip filter.
 *
 * @param item - Parsed class row with `utility` category id.
 * @param utilityState - Client utility selection.
 * @returns `true` when `kind` is `"all"` or ids match.
 *
 * @example isClassMatchingUtilityState({ utility: "text", ... }, { kind: "utility", id: "text" }) => true
 * @example isClassMatchingUtilityState({ utility: "flex", ... }, { kind: "utility", id: "text" }) => false
 */
export function isClassMatchingUtilityState(
	item: ClassItem,
	utilityState: UtilityState,
): boolean {
	if (utilityState.kind === "all") {
		return true;
	}
	if (item.utility === utilityState.id) {
		return true;
	}
	if (utilityState.kind === "utility") {
		const id = utilityState.id;
		if (
			(id === "flex" || id === "grid") &&
			isGapUtility(
				prepareTailwindClassForFilter(item.fullClass).utilityNormalized,
			)
		) {
			return true;
		}
	}
	return false;
}
