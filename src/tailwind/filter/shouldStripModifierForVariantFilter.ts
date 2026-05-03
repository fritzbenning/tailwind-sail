import type { FilterDimensionId } from "./variants";

/**
 * When hiding matching variant prefixes in the class list, strip a modifier segment whose
 * classified key equals the selected filter value — except for synthetic selections that do not
 * name a real prefix (idle / base).
 *
 * @param selection - Active filter chip key.
 * @param dimension - Dimension of the modifier.
 * @param classifiedModifierKey - Key from `classifyVariantModifier` (`./classify/classifyVariantModifier.ts`).
 * @returns Whether to strip this modifier for display.
 *
 * @example shouldStripModifierForVariantFilter("hover", "state", "hover") => true
 */
export function shouldStripModifierForVariantFilter(
	selection: string,
	dimension: FilterDimensionId,
	classifiedModifierKey: string,
): boolean {
	if (selection === "all") {
		return false;
	}
	if (dimension === "state" && selection === "idle") {
		return false;
	}
	if (dimension === "breakpoints" && selection === "base") {
		return false;
	}
	if (dimension === "container" && selection === "base") {
		return false;
	}
	return selection === classifiedModifierKey;
}
