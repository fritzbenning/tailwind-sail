import * as vscode from "vscode";

/**
 * Returns where to persist `tailwind-sail.variables.*` updates from commands:
 * {@link vscode.ConfigurationTarget.Workspace} when a folder is open, otherwise
 * {@link vscode.ConfigurationTarget.Global}.
 *
 * @returns Target used with `WorkspaceConfiguration.update` for variable-source commands.
 *
 * @example
 * getVariableSettingsTarget() // ConfigurationTarget.Workspace
 */
export function getVariableSettingsTarget(): vscode.ConfigurationTarget {
	return vscode.workspace.workspaceFolders?.length
		? vscode.ConfigurationTarget.Workspace
		: vscode.ConfigurationTarget.Global;
}
