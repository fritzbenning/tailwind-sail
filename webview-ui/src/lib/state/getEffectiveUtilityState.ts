import type { PanelModal } from "../../types";
import type { UtilityState } from "./types";

/**
 * If the panel exposes no utility chips, the effective filter is always “all”; otherwise it is the client’s selection.
 *
 * @example
 * // Input: panel.utilities = [], utilityState = { kind: "utility", id: "text" }
 * // Output: { kind: "all" }
 *
 * @example
 * // Input: panel.utilities = [{ id: "text", ... }], utilityState = { kind: "utility", id: "text" }
 * // Output: { kind: "utility", id: "text" }
 */
export function getEffectiveUtilityState(
	panel: PanelModal,
	utilityState: UtilityState,
): UtilityState {
	if (panel.utilities.length === 0) {
		return { kind: "all" };
	}
	return utilityState;
}
