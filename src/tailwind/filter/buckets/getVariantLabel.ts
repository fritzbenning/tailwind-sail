import { VARIANTS } from "..";
import type { FilterDimensionId } from "../variants";

/**
 * Human-readable sidebar title for a filter dimension.
 *
 * @param id - Filter dimension id.
 * @returns Label from config, or `id` if unknown.
 *
 * @example getVariantLabel("breakpoints") => "Breakpoints"
 */
export function getVariantLabel(id: FilterDimensionId): string {
	const found = VARIANTS.find(
		(d: { id: FilterDimensionId; label: string }) => d.id === id,
	);
	return found?.label ?? id;
}
