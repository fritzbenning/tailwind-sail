import type { AtRule } from "postcss";

/**
 * Finds the trimmed parameter span of `@apply …` inside a PostCSS `@apply` rule, using the same source string PostCSS parsed.
 *
 * @param atRule - Parsed `@apply` at-rule (`name` `"apply"`).
 * @param styleContent - Same CSS/SCSS string PostCSS used for offsets (`[start, end)` indices are into this string).
 * @returns Inclusive-exclusive offsets `[start, end)` over utility tokens before `;`, or `undefined` when unresolved.
 *
 * @example getTailwindApplyParamsBounds(atRuleSpanningThisText, "@apply flex;") => { start: 7, end: 11 }
 * @example getTailwindApplyParamsBounds(atRuleMissingApply, styleContent) => undefined
 */
export function getTailwindApplyParamsBounds(
	atRule: AtRule,
	styleContent: string,
): { start: number; end: number } | undefined {
	const s = atRule.source?.start?.offset;
	const e = atRule.source?.end?.offset;

	if (s === undefined || e === undefined) {
		return undefined;
	}

	const block = styleContent.slice(s, e);
	const match = block.match(/@apply\s+/i);

	if (!match || match.index === undefined) {
		return undefined;
	}

	const paramStart = s + match.index + match[0].length;
	let paramEnd = e;

	while (
		paramEnd > paramStart &&
		/\s/.test(styleContent.charAt(paramEnd - 1))
	) {
		paramEnd--;
	}

	if (paramEnd > paramStart && styleContent.charAt(paramEnd - 1) === ";") {
		paramEnd--;
	}

	while (
		paramEnd > paramStart &&
		/\s/.test(styleContent.charAt(paramEnd - 1))
	) {
		paramEnd--;
	}

	return { start: paramStart, end: paramEnd };
}
