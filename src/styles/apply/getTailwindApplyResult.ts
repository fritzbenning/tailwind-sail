import type { AtRule } from "postcss";
import type { ApplyTokenDocSpan } from "../../editor/types";
import { parseTailwindClasses } from "../../tailwind/parse/parseTailwindClasses";
import type { ParsedTailwindClass } from "../../tailwind/parse/types";
import { getTailwindApplyParamsBounds } from "./getTailwindApplyParamsBounds";
import { isTailwindApplyDirective } from "./isTailwindApplyDirective";
import type { TailwindApplyResult } from "./types";

/**
 * Returns merged class tokens plus document spans for sibling `@apply` directives in one rule body.
 *
 * @param styleContent - Parsed stylesheet substring (whole file or Vue `<style>` body).
 * @param styleContentOffset - Document offset of `styleContent.charAt(0)`.
 * @param applies - Direct `@apply` children in source order.
 * @returns Parsed utilities, `isTailwind` when any `@apply` exists, per-token `[docStart, docEnd)`, and insertion offset after the last param run.
 *
 * @example getTailwindApplyResult("@apply flex;", 0, directApplyChildrenFromParser).classes[0]!.name => "flex"
 * @example getTailwindApplyResult(styleContent, base, []).insertDocOffset => undefined
 */
export function getTailwindApplyResult(
	styleContent: string,
	styleContentOffset: number,
	applies: readonly AtRule[],
): TailwindApplyResult {
	const classes: ParsedTailwindClass[] = [];
	const tokenDocSpans: ApplyTokenDocSpan[] = [];

	let mergedRaw = "";

	for (const atRule of applies) {
		const bounds = getTailwindApplyParamsBounds(atRule, styleContent);

		if (!bounds) {
			continue;
		}

		const paramText = styleContent.slice(bounds.start, bounds.end);
		const tokensInParam = parseTailwindClasses(paramText).classes;

		for (const t of tokensInParam) {
			if (isTailwindApplyDirective(t.name)) {
				continue;
			}

			if (classes.length > 0) {
				mergedRaw += " ";
			}

			const startInRaw = mergedRaw.length;
			mergedRaw += t.name;
			const endInRaw = mergedRaw.length;

			const docStart = styleContentOffset + bounds.start + t.startInRaw;
			const docEnd = styleContentOffset + bounds.start + t.endInRaw;

			classes.push({ name: t.name, startInRaw, endInRaw });
			tokenDocSpans.push({ docStart, docEnd });
		}
	}

	const lastAtRule = applies[applies.length - 1];

	const lastBounds = lastAtRule
		? getTailwindApplyParamsBounds(lastAtRule, styleContent)
		: undefined;

	const insertDocOffset =
		lastBounds !== undefined ? styleContentOffset + lastBounds.end : undefined;

	return {
		classes,
		isTailwind: applies.length > 0,
		tokenDocSpans,
		insertDocOffset,
	};
}
