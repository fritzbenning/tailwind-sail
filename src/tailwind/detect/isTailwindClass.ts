import { findLastVariantSegment } from "../find/findLastVariantSegment";
import { stripImportantPrefix } from "../utils/stripImportantPrefix";
import {
	ARBITRARY_BRACKETS,
	COMMON_UTILITIES,
	COMMON_UTILITY_NAMESPACE,
} from "./constants";

/**
 * Heuristic: whether `token` looks like a Tailwind utility (not config-validated).
 *
 * @param token - Single class token (may include variants).
 * @returns `true` if the token matches built-in heuristics.
 *
 * @example isTailwindClass("p-4") => true
 */
export function isTailwindClass(token: string): boolean {
	const t = token.trim();
	if (!t) {
		return false;
	}

	if (ARBITRARY_BRACKETS.test(t)) {
		return true;
	}

	const last = stripImportantPrefix(findLastVariantSegment(t));
	if (!last) {
		return false;
	}

	if (ARBITRARY_BRACKETS.test(last)) {
		return true;
	}

	if (COMMON_UTILITIES.test(last)) {
		return true;
	}

	const hyphenParts = last.split("-");
	if (hyphenParts.length >= 2) {
		const head = hyphenParts[0];
		if (!head) {
			return false;
		}
		if (COMMON_UTILITY_NAMESPACE.has(head)) {
			return true;
		}
	}

	return false;
}
