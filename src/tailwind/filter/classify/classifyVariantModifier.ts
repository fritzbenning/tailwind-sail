import type { FilterDimensionId } from "../variants";
import { VARIANTS } from "../variants";

/**
 * Result of classifying one variant prefix (segment) for the sidebar filters.
 *
 * @example
 * // Input: `classifyVariantModifier('md:')`
 * // Output: `{ dimension: 'breakpoints', key: 'md', label: 'md' }`
 */
export interface ClassifiedVariant {
	readonly dimension: FilterDimensionId;
	/** Stable key for data attributes and filtering (segment without trailing `:`). */
	readonly key: string;
	/** Human-readable chip label (no trailing `:`). */
	readonly label: string;
}

/**
 * Maps a single variant segment (with or without trailing `:`) to a filter dimension and key.
 * The first matching row in {@link VARIANTS} wins.
 *
 * @example
 * // Input: `'hover:'`
 * // Output: `{ dimension: 'state', key: 'hover', label: 'hover' }`
 *
 * @example
 * // Input: `'dark:'`
 * // Output: `{ dimension: 'theme', key: 'dark', label: 'dark' }`
 */
export function classifyVariantModifier(
	modifierWithColon: string,
): ClassifiedVariant {
	const segment = modifierWithColon.endsWith(":")
		? modifierWithColon.slice(0, -1)
		: modifierWithColon;

	for (const def of VARIANTS) {
		if (def.match(segment)) {
			return {
				dimension: def.id,
				key: segment,
				label: segment,
			};
		}
	}

	throw new Error(
		`classifyVariantModifier: no dimension matched for segment ${JSON.stringify(segment)}`,
	);
}
