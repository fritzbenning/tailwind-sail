import * as vscode from "vscode";
import { normalizeThemePath } from "./normalizeThemePath";

/**
 * Reads `tailwind-sail.variables.sourceFiles`: workspace-relative paths to theme
 * `.css` files scanned for `--name: value` custom properties. Entries are normalized;
 * empty strings are dropped.
 *
 * @returns Normalized relative paths, e.g. `["src/app/globals.css"]`; empty when unset
 *   or the setting is not a string array.
 *
 * @example
 * readThemeFiles() // ["src/theme.css", "app/globals.css"]
 */
export function readThemeFiles(): string[] {
	const raw = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<unknown>("variables.sourceFiles");
	if (!Array.isArray(raw)) {
		return [];
	}
	return raw
		.filter((x): x is string => typeof x === "string")
		.map((s) => normalizeThemePath(s))
		.filter((s) => s.length > 0);
}
