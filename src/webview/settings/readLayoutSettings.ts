import * as vscode from "vscode";
import type { SidebarLayout } from "../types";
import { parseLayoutValue } from "./values/parseLayoutValue";

/**
 * Reads `tailwind-sail.layout` from the workspace configuration and returns the
 * effective layout for webview chrome (horizontal padding). Uses the contributed
 * default (`loose`) when the key is unset.
 */
export function readLayoutSettings(): SidebarLayout {
	const raw = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<string>("layout", "loose");
	return parseLayoutValue(raw);
}
