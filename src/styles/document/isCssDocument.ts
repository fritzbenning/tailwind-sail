import * as vscode from "vscode";

/**
 * Whether the document is a dedicated stylesheet (the entire file is CSS-like), not an SFC or HTML shell.
 *
 * @param document - Active editor document.
 * @returns `true` when language or file extension indicates a dedicated CSS/SCSS/PostCSS file.
 *
 * @example isCssDocument(cssLanguageDocument) => true
 * @example isCssDocument(vueSfcDocument) => false
 */
export function isCssDocument(document: vscode.TextDocument): boolean {
	const lang = document.languageId.toLowerCase();
	const pathLower = document.fileName.toLowerCase();

	if (
		lang === "css" ||
		lang === "scss" ||
		lang === "sass" ||
		lang === "postcss"
	) {
		return true;
	}

	return (
		pathLower.endsWith(".css") ||
		pathLower.endsWith(".scss") ||
		pathLower.endsWith(".sass") ||
		pathLower.endsWith(".pcss") ||
		pathLower.endsWith(".postcss")
	);
}
