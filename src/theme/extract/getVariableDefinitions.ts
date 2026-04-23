import * as vscode from "vscode";
import type { CssVariableEntry } from "../types";
import { extractVariableDefinitions } from "./extractVariableDefinitions";
import type { VariableDefinitionRowWithUri } from "./mergeVariableDefinitions";
import { mergeVariableDefinitions } from "./mergeVariableDefinitions";
import { resolveThemeFileUris } from "./resolveThemeFileUris";

const MAX_READ_BYTES = 512 * 1024;

/**
 * Reads configured `tailwind-sail.variables.sourceFiles`, extracts `--name: value`
 * custom properties from each existing file, merges duplicate names, and returns
 * entries for the webview.
 *
 * @returns Merged CSS variable entries for the sidebar webview; empty when no sources
 *   are configured or all files are missing or oversize.
 *
 * @example
 * await getVariableDefinitions() // [{ name: "--brand", value: "#f00", locations: [...] }, ...]
 */
export async function getVariableDefinitions(): Promise<CssVariableEntry[]> {
	const themeFileUris = resolveThemeFileUris();
	const allRows: VariableDefinitionRowWithUri[] = [];

	for (const uri of themeFileUris) {
		try {
			const stat = await vscode.workspace.fs.stat(uri);

			if (stat.size > MAX_READ_BYTES) {
				continue;
			}

			const bytes = await vscode.workspace.fs.readFile(uri);
			const text = new TextDecoder("utf-8").decode(bytes);

			const rows = extractVariableDefinitions(uri.fsPath, text);
			const uriStr = uri.toString();

			for (const r of rows) {
				allRows.push({ ...r, uri: uriStr });
			}
		} catch {
			// Skip missing or unreadable files.
		}
	}

	return mergeVariableDefinitions(allRows);
}
