import type { Root } from "postcss";
import postcss from "postcss";
import postcssScss from "postcss-scss";

/**
 * Parses stylesheet text into a PostCSS AST, optionally using SCSS syntax.
 *
 * @param styleContent - CSS or SCSS text (e.g. a full file or a Vue `<style>` body).
 * @param useScssSyntax - When `true`, use `postcss-scss` parsing.
 * @returns Root AST, or `undefined` when parsing fails.
 *
 * @example parseStyleContent(".x { color: red; }", false) => Root with one Rule
 * @example parseStyleContent("not valid css {{{", false) => undefined
 */
export function parseStyleContent(
	styleContent: string,
	useScssSyntax: boolean,
): Root | undefined {
	try {
		return postcss.parse(styleContent, {
			from: undefined,
			...(useScssSyntax ? { parser: postcssScss.parse } : {}),
		});
	} catch {
		return undefined;
	}
}
