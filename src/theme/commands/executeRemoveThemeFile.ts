import * as vscode from "vscode";
import { getVariableSettingsTarget } from "../config/getVariableSettingsTarget";
import { normalizeThemePath } from "../config/normalizeThemePath";
import { readThemeFiles } from "../config/readThemeFiles";
import { removeThemeFile } from "../config/removeThemeFile";

/**
 * Removes the active editor file’s workspace-relative path from
 * `tailwind-sail.variables.sourceFiles` when it is inside a workspace folder.
 *
 * @returns Resolves when settings are updated or after showing a warning/info message.
 *
 * @example
 * // Bound to command `tailwind-sail.removeThemeFile`.
 * await executeRemoveThemeFile();
 */
export async function executeRemoveThemeFile(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor || editor.document.uri.scheme !== "file") {
		void vscode.window.showWarningMessage(
			"Tailwind Sail: open a file in the workspace to remove from theme files.",
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
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	const current = readThemeFiles();
	const next = removeThemeFile(current, normalized);
	if (next.length === current.length) {
		void vscode.window.showInformationMessage(
			`Tailwind Sail: "${normalized}" is not in the theme file list.`,
		);
		return;
	}
	await config.update(
		"variables.sourceFiles",
		next,
		getVariableSettingsTarget(),
	);
	void vscode.window.showInformationMessage(
		`Tailwind Sail: removed "${normalized}" from theme files.`,
	);
}
