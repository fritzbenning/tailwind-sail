import * as vscode from "vscode";
import type { ThemeFileScanInfo } from "../../webview/types";
import { resolveThemeFileUris } from "../extract/resolveThemeFileUris";
import { readThemeFiles } from "./readThemeFiles";

/**
 * Counts configured theme paths, resolved `.css` URIs, and whether a workspace
 * is open. Used by the webview to explain an empty variable list.
 */
export function getThemeFileScanInfo(): ThemeFileScanInfo {
	const hasWorkspace = (vscode.workspace.workspaceFolders?.length ?? 0) > 0;
	return {
		configuredPathCount: readThemeFiles().length,
		resolvedCssPathCount: resolveThemeFileUris().length,
		hasWorkspace,
	};
}
