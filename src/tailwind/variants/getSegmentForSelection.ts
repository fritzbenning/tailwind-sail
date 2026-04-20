import type { FilterDimensionId } from "../filter/variants";
import { getChipKey } from "../utils/getChipKey";

/**
 * Variant prefix segment for a sidebar selection, or `null` when selection means “no prefix” (`all`, `idle`, `base`, `light`).
 *
 * @param dimension - Filter dimension id.
 * @param selection - Chip key / label (may include `:`).
 * @returns Tailwind prefix ending with `:`, or `null`.
 *
 * @example getSegmentForSelection("theme", "dark") => "dark:"
 */
export function getSegmentForSelection(
	dimension: FilterDimensionId,
	selection: string,
): string | null {
	if (selection === "all") {
		return null;
	}

	const key = getChipKey(selection);

	if (dimension === "state" && key === "idle") {
		return null;
	}

	if (dimension === "breakpoints" && key === "base") {
		return null;
	}

	if (dimension === "container" && key === "base") {
		return null;
	}

	if (dimension === "theme" && key === "light") {
		return null;
	}

	const raw = selection.trim();

	return raw.endsWith(":") ? raw : `${raw}:`;
}
