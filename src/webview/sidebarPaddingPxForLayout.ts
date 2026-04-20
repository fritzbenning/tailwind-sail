import type { TailwindSailLayout } from "./webviewShell";

/**
 * Horizontal inset (in CSS pixels) for sidebar content for a given
 * {@link TailwindSailLayout}.
 */
export function sidebarPaddingXPxForLayout(layout: TailwindSailLayout): number {
	return layout === "compact" ? 8 : 20;
}

/**
 * Top padding (in CSS pixels) on the sidebar webview body for a given
 * {@link TailwindSailLayout}.
 */
export function sidebarPaddingTopPxForLayout(
	layout: TailwindSailLayout,
): number {
	return layout === "compact" ? 4 : 12;
}
