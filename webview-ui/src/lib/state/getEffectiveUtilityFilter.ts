import type { PanelModal } from "../../types";
import type { UtilityFilter } from "./types";

/**
 * If the panel exposes no utility chips, the effective filter is always “all”; otherwise it is the client’s selection.
 *
 * @example
 * // Input: panel.utilities = [], st = { t: "utility", v: "text" }
 * // Output: { t: "all" }
 *
 * @example
 * // Input: panel.utilities = [{ id: "text", ... }], st = { t: "utility", v: "text" }
 * // Output: { t: "utility", v: "text" }
 */
export function getEffectiveUtilityFilter(
	panel: PanelModal,
	st: UtilityFilter,
): UtilityFilter {
	if (panel.utilities.length === 0) {
		return { t: "all" };
	}
	return st;
}
