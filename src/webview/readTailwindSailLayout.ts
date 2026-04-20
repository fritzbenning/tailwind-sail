import * as vscode from "vscode";
import type { TailwindSailLayout } from "./webviewShell";

/**
 * Maps a stored `tailwind-sail.layout` / `tailwind-sail.paddingTop` value to a
 * {@link TailwindSailLayout}.
 * Any value other than `"compact"` is treated as `"loose"` (including `undefined`
 * and unexpected strings) so the sidebar stays usable if the setting is corrupted.
 */
export function parseTailwindSailLayoutSetting(
	raw: string | undefined,
): TailwindSailLayout {
	return raw === "compact" ? "compact" : "loose";
}

/**
 * Reads `tailwind-sail.layout` from the workspace configuration and returns the
 * effective layout for webview chrome (horizontal padding). Uses the contributed
 * default (`loose`) when the key is unset.
 */
export function readTailwindSailLayout(): TailwindSailLayout {
	const raw = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<string>("layout", "loose");
	return parseTailwindSailLayoutSetting(raw);
}

/**
 * Reads `tailwind-sail.paddingTop` from the workspace configuration. Uses the
 * contributed default (`compact`) when the key is unset.
 */
export function readTailwindSailPaddingTop(): TailwindSailLayout {
	const raw = vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<string>("paddingTop", "compact");
	return parseTailwindSailLayoutSetting(raw);
}

/**
 * Reads `tailwind-sail.showSidebarRightBorder` (default `false`).
 */
export function readTailwindSailShowSidebarRightBorder(): boolean {
	return vscode.workspace
		.getConfiguration("tailwind-sail")
		.get<boolean>("showSidebarRightBorder", false);
}
