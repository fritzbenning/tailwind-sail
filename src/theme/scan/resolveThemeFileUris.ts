import * as vscode from "vscode";
import { isCssFile } from "../check/isCssFile";
import { joinWorkspacePath } from "../config/joinWorkspacePath";
import { readThemeFiles } from "../config/readThemeFiles";

/**
 * Builds absolute `file` URIs for every `(workspace folder × configured relative path)`
 * pair for `.css` theme paths only, deduping by `fsPath`.
 *
 * @returns URIs to read when scanning CSS variables (missing files are skipped later).
 *   Empty when `variables.sourceFiles` is empty or there is no workspace folder.
 *
 * @example
 * // With one folder and `["src/app/globals.css"]`:
 * resolveThemeFileUris() // [ Uri { scheme: "file", path: ".../src/app/globals.css" } ]
 */
export function resolveThemeFileUris(): vscode.Uri[] {
	const folders = vscode.workspace.workspaceFolders ?? [];

	const paths = readThemeFiles();
	const seen = new Set<string>();
	const out: vscode.Uri[] = [];

	for (const folder of folders) {
		for (const p of paths) {
			if (!isCssFile(p)) {
				continue;
			}
			const uri = joinWorkspacePath(folder.uri, p);
			const key = uri.fsPath;
			if (seen.has(key)) {
				continue;
			}
			seen.add(key);
			out.push(uri);
		}
	}

	return out;
}
