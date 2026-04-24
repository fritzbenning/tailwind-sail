import { createMemo } from "solid-js";
import type { ThemeFileScanInfo } from "../types";
import { vscode } from "../vscode";
import { InlineNotification } from "./InlineNotification";
import { LinkButton } from "./LinkButton";
import { LinkGroup } from "./LinkGroup";

function themeEmptyCopy(scan: ThemeFileScanInfo): { body: string } {
	if (!scan.hasWorkspace) {
		return {
			body: "Open a folder or workspace, then add .css theme files in “Variables: Source Files” or use “Add current file as theme file” below.",
		};
	}
	if (scan.configuredPathCount === 0) {
		return {
			body: "Add at least one workspace-relative .css file (your Tailwind theme entry) under “Variables: Source Files” so custom properties can appear in this list.",
		};
	}
	if (scan.resolvedCssPathCount === 0) {
		return {
			body: "Every listed path is skipped: only .css files are scanned. Remove non-.css entries or point to your actual theme stylesheet.",
		};
	}
	return {
		body: "No custom properties were found. Check that the configured files exist, are at most 512KB, and contain `--name: value` rules in CSS. Missing or invalid files are skipped.",
	};
}

/**
 * Shown when the variable list from the host is empty (not a search miss).
 * Explains likely misconfiguration and offers the same entry points as settings.
 */
export function ThemeEmptyState(props: { scan: ThemeFileScanInfo }) {
	const copy = createMemo(() => themeEmptyCopy(props.scan));

	function openSourceFilesSetting() {
		vscode.postMessage({ type: "tailwind-sail-open-theme-file-settings" });
	}

	function addCurrentFile() {
		vscode.postMessage({ type: "tailwind-sail-add-theme-file" });
	}

	return (
		<InlineNotification showInfoIcon={false} role="status">
			<p>{copy().body}</p>
			<LinkGroup aria-label="Theme file actions">
				<LinkButton onClick={openSourceFilesSetting}>
					Open source file settings
				</LinkButton>
				<LinkButton onClick={addCurrentFile}>
					Add current file as theme file
				</LinkButton>
			</LinkGroup>
		</InlineNotification>
	);
}
