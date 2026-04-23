import type { SidebarLayout } from "../../types";

/**
 * Top padding (in CSS pixels) on the sidebar webview body for a given
 * {@link SidebarLayout}.
 */
export function getSidebarPaddingTop(layout: SidebarLayout): number {
	return layout === "compact" ? 4 : 12;
}
