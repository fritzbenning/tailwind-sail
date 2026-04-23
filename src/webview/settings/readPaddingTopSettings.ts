import * as vscode from "vscode";
import type { SidebarLayout } from "../types";
import { parseLayoutValue } from "./values/parseLayoutValue";

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
