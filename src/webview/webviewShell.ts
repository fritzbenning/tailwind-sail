/**
 * Sidebar webview chrome from spacing preferences (horizontal inset and top padding).
 */
import {
	sidebarPaddingTopPxForLayout,
	sidebarPaddingXPxForLayout,
} from "./sidebarPaddingPxForLayout";

export type TailwindSailLayout = "compact" | "loose";

export type WebviewShell = {
	/** Horizontal inset for panel content (px). */
	sidebarPaddingXPx: number;
	/** Top padding on the webview body (px). */
	sidebarPaddingTopPx: number;
};

export function webviewShellForLayout(
	horizontal: TailwindSailLayout = "loose",
	paddingTop: TailwindSailLayout = "compact",
): WebviewShell {
	return {
		sidebarPaddingXPx: sidebarPaddingXPxForLayout(horizontal),
		sidebarPaddingTopPx: sidebarPaddingTopPxForLayout(paddingTop),
	};
}
