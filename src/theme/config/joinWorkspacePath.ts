import * as vscode from "vscode";

/**
 * Joins a workspace folder URI with a POSIX-style relative path from settings.
 *
 * @param folderUri - Root of a workspace folder (`WorkspaceFolder.uri`).
 * @param relativePosixPath - Normalized path with `/` segments (no leading slash).
 * @returns A `file` URI to the combined path.
 *
 * @example
 * joinWorkspacePath(folder.uri, "src/a.css") // file:///…/src/a.css
 */
export function joinWorkspacePath(
	folderUri: vscode.Uri,
	relativePosixPath: string,
): vscode.Uri {
	const segments = relativePosixPath.split("/").filter((s) => s.length > 0);
	return vscode.Uri.joinPath(folderUri, ...segments);
}
