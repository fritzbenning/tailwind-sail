import type { SailWebviewPanelModel } from "sail-protocol";
import type { ClientFilterState } from "../types/filterStateTypes";

/**
 * Whether every selected utility chip and variant value still exists on the current panel model.
 * Used to reset client state when the underlying class list or chip metadata changes.
 *
 * @example
 * // Input: st.utility = { t: "utility", v: "text" }, panel has a utility chip with id "text"
 * // Output: true
 *
 * @example
 * // Input: st.utility = { t: "utility", v: "bogus" }, panel chips don’t include "bogus"
 * // Output: false
 */
export function isClientFilterStateValidForPanel(
	panel: SailWebviewPanelModel,
	st: ClientFilterState,
): boolean {
	const utility = st.utility;
	if (utility.t === "all") {
		/* ok */
	} else if (utility.t === "utility") {
		const ok = panel.utilityChips.some((c) => c.id === utility.v);
		if (!ok) {
			return false;
		}
	} else {
		return false;
	}

	for (const row of panel.variantRows) {
		const sel = st.variant[row.dimension] ?? "all";
		if (sel === "all") {
			continue;
		}
		if (!row.values.includes(sel)) {
			return false;
		}
	}
	return true;
}
