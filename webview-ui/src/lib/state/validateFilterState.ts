import type { PanelModal } from "../../types";
import type { ClientFilterState } from "./types";

/**
 * Whether every selected utility chip and variant value still exists on the current panel model.
 * Used to reset client state when the underlying class list or chip metadata changes.
 *
 * @example
 * // Input: filterState.utility = { t: "utility", v: "text" }, panel has a utility chip with id "text"
 * // Output: true
 *
 * @example
 * // Input: filterState.utility = { t: "utility", v: "bogus" }, panel chips don’t include "bogus"
 * // Output: false
 */
export function validateFilterState(
	panel: PanelModal,
	filterState: ClientFilterState,
): boolean {
	const utility = filterState.utility;
	if (utility.t === "all") {
		/* ok */
	} else if (utility.t === "utility") {
		const ok = panel.utilities.some((chip) => chip.id === utility.v);
		if (!ok) {
			return false;
		}
	} else {
		return false;
	}

	for (const row of panel.variants) {
		const selectedVariant = filterState.variant[row.dimension] ?? "all";
		if (selectedVariant === "all") {
			continue;
		}
		if (!row.values.includes(selectedVariant)) {
			return false;
		}
	}
	return true;
}
