import * as vscode from "vscode";
import { isCssDocument } from "../document/isCssDocument";
import { isScssDocument } from "../document/isScssDocument";
import { findStyleTagContent } from "./findStyleTagContent";
import type { StyleContentInfo } from "./types";

/**
 * Returns stylesheet text covering `documentOffset` when it lies in supported CSS: a standalone stylesheet or the body of an embedded `<style>` element.
 *
 * `<style>` regions are found by pattern (Vue, Svelte, Astro, HTML, etc.). Standalone `.css` / `.scss` files use the full document as the style content.
 *
 * @param document - Active editor document.
 * @param documentOffset - Absolute offset in {@link vscode.TextDocument.getText}.
 * @returns Style content aligned with PostCSS `source.offset` semantics, plus its start offset in the document.
 *
 * @example findStyleContent(standaloneCssDoc, anyOffsetInFile)?.styleContentOffset === 0
 * @example findStyleContent(vueDoc, offsetOutsideStyleAndCss) => undefined
 */
export function findStyleContent(
	document: vscode.TextDocument,
	documentOffset: number,
): StyleContentInfo | undefined {
	const documentContent = document.getText();

	const embedded = findStyleTagContent(documentContent, documentOffset);

	if (embedded) {
		return embedded;
	}

	if (!isCssDocument(document)) {
		return undefined;
	}

	return {
		styleContent: documentContent,
		styleContentOffset: 0,
		useScssSyntax: isScssDocument(document),
	};
}
