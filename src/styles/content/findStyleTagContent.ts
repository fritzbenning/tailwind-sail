import { getStyleLangValue } from "./getStyleLangValue";
import type { StyleContentInfo } from "./types";

/**
 * When `documentOffset` lies inside a `<style>...</style>` region, returns that region’s CSS body and metadata.
 *
 * `styleContent` is always the **entire** inner text of the matching block: several rules (e.g. `.x` and `.y`) in one tag share one string. Separate `<style>` tags are unrelated—whichever opening tag pair contains `documentOffset` wins, in document order.
 *
 * Matches HTML-style `<style>` elements (case-insensitive tag names) used in Vue, Svelte, Astro, plain HTML, etc.
 *
 * @param documentText - Full document source.
 * @param documentOffset - Absolute offset into {@link documentText}.
 * @returns Style content for the matching block’s inner text, or `undefined` when the offset is outside any such block.
 *
 * @example findStyleTagContent("<style>.x{}</style>", 8)?.styleContent === ".x{}"
 * @example findStyleTagContent("<style>.x{}.y{}</style>", 12)?.styleContent === ".x{}.y{}" — offset inside `.y{}` still returns the whole `<style>` body
 * @example findStyleTagContent("<div></div>", 0) => undefined
 */
export function findStyleTagContent(
	documentText: string,
	documentOffset: number,
): StyleContentInfo | undefined {
	if (!/<style\b/i.test(documentText)) {
		return undefined;
	}

	const openRe = /<style\b([^>]*)>/gi;
	let match: RegExpExecArray | null;

	while ((match = openRe.exec(documentText)) !== null) {
		const openTagMarkup = match[0]!;
		const angleClose = match.index + openTagMarkup.lastIndexOf(">") + 1;
		const afterOpen = documentText.slice(angleClose);
		const closeMatch = /<\/style\s*>/i.exec(afterOpen);

		if (!closeMatch) {
			continue;
		}

		const closeIdx = angleClose + closeMatch.index;

		if (documentOffset < angleClose || documentOffset >= closeIdx) {
			continue;
		}

		const lang = getStyleLangValue(openTagMarkup) || "css";
		const styleContent = documentText.slice(angleClose, closeIdx);

		const useScssSyntax = lang === "scss" || lang === "sass";

		return {
			styleContent,
			styleContentOffset: angleClose,
			useScssSyntax,
		};
	}

	return;
}
