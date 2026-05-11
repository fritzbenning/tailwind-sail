import * as vscode from "vscode";

/**
 * Whether PostCSS should parse the stylesheet body as SCSS/Sass syntax.
 *
 * True when the editor language id is SCSS/Sass or the path ends with `.scss` / `.sass` (e.g. misclassified as plain CSS).
 *
 * @param document - Active editor document.
 * @returns `true` when language id or file extension indicates SCSS/Sass.
 *
 * @example isScssDocument(scssLanguageDocument) => true
 * @example isScssDocument(cssLanguageDocumentWithDotScssPath) => true
 */
export function isScssDocument(document: vscode.TextDocument): boolean {
	const lang = document.languageId.toLowerCase();
	const pathLower = document.fileName.toLowerCase();

	return (
		lang === "scss" ||
		lang === "sass" ||
		pathLower.endsWith(".scss") ||
		pathLower.endsWith(".sass")
	);
}
