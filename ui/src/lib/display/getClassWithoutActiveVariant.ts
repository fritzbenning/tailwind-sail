import {
	classifyVariantModifier,
	shouldStripModifierForVariantFilter,
} from "@ext/filter";
import { splitTailwindClassVariants } from "@ext/variants/splitTailwindClassVariants";
import type { VariantState } from "../state/types";

/**
 * Rebuilds the class string for display by dropping variant modifiers that are redundant
 *
 * given the current variant filter (e.g. hide the `md:` prefix when `screens` is filtered to `md`).
 *
 * @param fullClass - Full class token with variants.
 * @param variantEff - Active variant chip selections per dimension.
 * @returns Display string with redundant prefixes removed when filters pin them.
 *
 * @example getClassWithoutActiveVariant("md:hover:text-red-500", { ...empty, breakpoints: "md" }) => "hover:text-red-500" where `empty` is {@link getEmptyVariantState}.
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
