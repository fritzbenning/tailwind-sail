import type { PanelModal } from "../../types";
import type { UtilityState } from "./types";

/**
 * If the panel exposes no utility chips, the effective filter is always “all”; otherwise it is the client’s selection.
 *
 * @example
 * // Input: panel.utilities = [], utilityState = { t: "utility", v: "text" }
 * // Output: { t: "all" }
 *
 * @example
 * // Input: panel.utilities = [{ id: "text", ... }], utilityState = { t: "utility", v: "text" }
 * // Output: { t: "utility", v: "text" }
 */
export function getEffectiveUtilityState(
	panel: PanelModal,
	utilityState: UtilityState,
): UtilityState {
	if (panel.utilities.length === 0) {
		return { t: "all" };
	}
	return utilityState;
}
