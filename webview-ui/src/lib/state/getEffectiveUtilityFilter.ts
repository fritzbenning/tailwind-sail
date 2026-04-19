import type { SailWebviewPanelModel } from "sail-protocol";
import type { UtilityFilter } from "../types/filterStateTypes";

/**
 * If the panel exposes no utility chips, the effective filter is always “all”; otherwise it is the client’s selection.
 *
 * @example
 * // Input: panel.utilityChips = [], st = { t: "utility", v: "text" }
 * // Output: { t: "all" }
 *
 * @example
 * // Input: panel.utilityChips = [{ id: "text", ... }], st = { t: "utility", v: "text" }
 * // Output: { t: "utility", v: "text" }
 */
export function getEffectiveUtilityFilter(
	panel: SailWebviewPanelModel,
	st: UtilityFilter,
): UtilityFilter {
	if (panel.utilityChips.length === 0) {
		return { t: "all" };
	}
	return st;
}
