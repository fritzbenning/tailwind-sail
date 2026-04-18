import { VARIANTS } from "..";
import type { FilterDimensionId } from "../variants";


/**
 * Readable sidebar label for a dimension id.
 *
 * @example
 * // Input: `'breakpoints'`
 * // Output: `'Breakpoints'`
 *
 * @example
 * // Input: `'form'`
 * // Output: `'Forms'`
 */
export function getVariantLabel(id: FilterDimensionId): string {
	const found = VARIANTS.find((d: { id: FilterDimensionId; label: string; }) => d.id === id);
	return found?.label ?? id;
}
