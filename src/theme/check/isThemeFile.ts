import * as vscode from "vscode";
import { resolveThemeFileUris } from "../extract/resolveThemeFileUris";

/**
 * Returns whether `docUri` is one of the resolved `variables.sourceFiles` targets
 * (same `fsPath` as a configured file under a workspace folder).
 *
 * @param docUri - Typically `TextDocument.uri`.
 * @returns `true` when this document path matches a resolved theme file URI.
 *
 * @example
 * isThemeFile(doc.uri) // true while editing a listed globals.css
 */
export function isThemeFile(docUri: vscode.Uri): boolean {
	if (docUri.scheme !== "file") {
		return false;
	}
	const docPath = docUri.fsPath;
	const targets = resolveThemeFileUris();
	return targets.some((u) => u.fsPath === docPath);
}
