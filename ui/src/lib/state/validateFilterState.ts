import type { PanelModal } from "../../types";
import type { FilterState } from "./types";

/**
 * Whether every selected utility chip and variant value still exists on the current panel model.
 *
 * Used to reset client state when the underlying class list or chip metadata changes.
 *
 * @param panel - Current panel model.
 * @param filterState - Client filter snapshot.
 * @returns `true` when all selections are still valid options.
 *
 * @example validateFilterState(panel, getDefaultFilterState()) => true for a matching panel.
 */
export function validateFilterState(
	panel: PanelModal,
	filterState: FilterState,
): boolean {
	const utility = filterState.activeUtility;
	if (utility.kind === "utility") {
		const ok = panel.utilities.some((chip) => chip.id === utility.id);
		if (!ok) {
			return false;
		}
	}

	for (const row of panel.variants) {
		const selectedVariant = filterState.activeVariants[row.dimension] ?? "all";
		if (selectedVariant === "all") {
			continue;
		}
		if (!row.value.includes(selectedVariant)) {
			return false;
		}
	}
	return true;
}
