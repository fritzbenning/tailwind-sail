import { COMMON_UTILITIES, COMMON_UTILITY_NAMESPACE, ARBITRARY_BRACKETS } from './constants';
import { findLastVariantSegment } from '../find/findLastVariantSegment';
import { stripImportantPrefix } from '../utils/stripImportantPrefix';

/**
 * True if `token` plausibly resembles one Tailwind utility token (after variants).
 * False negatives/positives are expected; use for UX hints only.
 *
 * Limitations: see top-level comment in `constants.ts` and Tailwind docs — not exhaustive validation.
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

	const hyphenParts = last.split('-');
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
