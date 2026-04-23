import type { SimpleDefinitionScope } from "../types";
import { findSelector } from "./findSelector";

const ALLOWED_SELECTORS = new Set<string>([":root", "html", "body", ":host"]);

/**
 * When the opening `{` for the block containing a declaration is found, maps the
 * selector to a simple scope label if allowlisted.
 *
 * @param selectorLineText - Full line containing the `{` that opens the block.
 * @returns A scope such as `":root"`, or `undefined` if the selector is not allowlisted.
 *
 * @example
 * getSelectorScope(":root {") // ":root"
 * getSelectorScope(".foo {") // undefined
 */
export function getSelectorScope(
	selectorLineText: string,
): SimpleDefinitionScope | undefined {
	const selector = findSelector(selectorLineText);
	if (!selector) {
		return undefined;
	}
	return ALLOWED_SELECTORS.has(selector)
		? (selector as SimpleDefinitionScope)
		: undefined;
}
