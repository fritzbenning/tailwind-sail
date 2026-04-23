import {
	classifyVariantModifier,
	shouldStripModifierForVariantFilter,
} from "@ext/filter";
import { splitTailwindClassVariants } from "@ext/variants/splitTailwindClassVariants";
import type { VariantState } from "../state/types";

/**
 * Rebuilds the class string for display by dropping variant modifiers redundant with pinned filters.
 *
 * @param fullClass - Full class token with variants.
 * @param variantEff - Active variant chip selections per dimension.
 * @returns Display string with removable prefixes stripped.
 *
 * @example getClassWithoutActiveVariant("md:flex", { ...getEmptyVariantState(), breakpoints: "md" }) => "flex"
 */
export function getClassWithoutActiveVariant(
	fullClass: string,
	variantEff: VariantState,
): string {
	const trimmed = fullClass.trim();
	if (!trimmed) {
		return fullClass;
	}
	const { modifiers, utility } = splitTailwindClassVariants(trimmed);
	const kept: string[] = [];
	for (const mod of modifiers) {
		const { dimension, key } = classifyVariantModifier(mod);
		const selection = variantEff[dimension] ?? "all";
		if (shouldStripModifierForVariantFilter(selection, dimension, key)) {
			continue;
		}
		kept.push(mod);
	}
	return kept.join("") + utility;
}
