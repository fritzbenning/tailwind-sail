import * as vscode from "vscode";
import { parseLayoutValue } from "./settings/values/parseLayoutValue";
import type { SidebarLayout } from "./types";

/**
 * Reads `tailwind-sail.paddingTop` from the workspace configuration. Uses the
 * contributed default (`compact`) when the key is unset.
 */
export function readPaddingTopSettings(): SidebarLayout {
	const raw = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<string>("paddingTop", "compact");
	return parseLayoutValue(raw);
}
