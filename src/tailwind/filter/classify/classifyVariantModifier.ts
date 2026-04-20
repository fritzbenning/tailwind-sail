import type { FilterDimensionId } from "../variants";
import { VARIANTS } from "../variants";

/**
 * Classified variant segment for filter UI.
 *
 * @property dimension - Sidebar row id for this segment.
 *
 * @property key - Filter key without trailing `:`.
 * @property label - Chip label text.
 *
 * @example classifyVariantModifier("hover:") => { dimension: "state", key: "hover", label: "hover" }
 */
export interface ClassifiedVariant {
	readonly dimension: FilterDimensionId;
	readonly key: string;
	readonly label: string;
}

/**
 * Maps one variant segment (optional trailing `:`) to a dimension/key; first {@link VARIANTS} match wins.
 *
 * @param modifierWithColon - Raw variant segment from a class token.
 * @returns Dimension, key, and label for filter chips.
 *
 * @example classifyVariantModifier("hover:").key => "hover"
 *
 * @example classifyVariantModifier("dark:").dimension => "theme"
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

	return {
		dimension: "other",
		key: segment,
		label: segment,
	};
}
