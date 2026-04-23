import * as vscode from "vscode";
import { isCssFile } from "../check/isCssFile";
import { addThemeFile } from "../config/addThemeFile";
import { getVariableSettingsTarget } from "../config/getVariableSettingsTarget";
import { normalizeThemePath } from "../config/normalizeThemePath";
import { readThemeFiles } from "../config/readThemeFiles";

/**
 * Adds the active editor file’s workspace-relative path to
 * `tailwind-sail.variables.sourceFiles` when it is inside a workspace folder.
 *
 * @returns Resolves when settings are updated or after showing a warning/info message.
 *
 * @example
 * // Bound to command `tailwind-sail.addThemeFile`.
 * await executeAddThemeFile();
 */
export async function executeAddThemeFile(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor || editor.document.uri.scheme !== "file") {
		void vscode.window.showWarningMessage(
			"Tailwind Sail: open a saved file in the workspace to add as a theme file.",
		);
		return;
	}
	const wf = vscode.workspace.getWorkspaceFolder(editor.document.uri);
	if (!wf) {
		void vscode.window.showWarningMessage(
			"Tailwind Sail: the file must belong to a workspace folder.",
		);
		return;
	}
	const relative = vscode.workspace.asRelativePath(editor.document.uri, false);
	const normalized = normalizeThemePath(relative);
	if (normalized.length === 0) {
		return;
	}
	if (!isCssFile(normalized)) {
		void vscode.window.showWarningMessage(
			"Tailwind Sail: only `.css` files can be theme files (Tailwind theme entrypoints).",
		);
		return;
	}
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	const current = readThemeFiles();
	const next = addThemeFile(current, normalized);
	if (next.length === current.length) {
		void vscode.window.showInformationMessage(
			`Tailwind Sail: "${normalized}" is already in the theme file list.`,
		);
		return;
	}
	await config.update(
		"variables.sourceFiles",
		next,
		getVariableSettingsTarget(),
	);
	void vscode.window.showInformationMessage(
		`Tailwind Sail: added "${normalized}" to theme files.`,
	);
}
