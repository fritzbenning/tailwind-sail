import type { PanelModal } from "../../types";
import type { UtilityState } from "./types";

/**
 * If the panel exposes no utility chips, the effective filter is always “all”; otherwise it is the client’s selection.
 *
 * @param panel - Panel model from the extension.
 * @param utilityState - Client utility filter selection.
 * @returns Effective utility state for list filtering.
 *
 * @example getEffectiveUtilityState({ ...panel, utilities: [] }, { kind: "utility", id: "text" }) => { kind: "all" }
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
