import {
	classifyVariantModifier,
	shouldStripModifierForVariantFilter,
} from "@ext/filter";
import { splitTailwindClassVariants } from "@ext/variants/splitTailwindClassVariants";
import type { VariantFilterState } from "../state/types";

/**
 * Rebuilds the class string for display by dropping variant modifiers that are redundant
 * given the current variant filter (e.g. hide the `md:` prefix when `screens` is filtered to `md`).
 *
 * @example
 * // Input:
 * //   fullClass = "md:hover:text-red-500"
 * //   variantEff = { screens: "md", ... }
 * // Output:
 * //   "hover:text-red-500"   // "md:" stripped because screens is pinned to md
 *
 * @example
 * // Input: fullClass = "  ", variantEff = any
 * // Output: same whitespace-only string (trimmed empty → unchanged)
 */
export function getDisplayClassWithoutRedundantVariantModifiers(
	fullClass: string,
	variantEff: VariantFilterState,
): string {
	const trimmed = fullClass.trim();
	if (!trimmed) {
		return fullClass;
	}
	const { modifiers, utility } = splitTailwindClassVariants(trimmed);
	const kept: string[] = [];
	for (const mod of modifiers) {
		const { dimension, key } = classifyVariantModifier(mod);
		const sel = variantEff[dimension] ?? "all";
		if (shouldStripModifierForVariantFilter(sel, dimension, key)) {
			continue;
		}
		kept.push(mod);
	}
	return kept.join("") + utility;
}
