import type { SidebarLayout } from "../../types";

/**
 * Horizontal inset (in CSS pixels) for sidebar content for a given
 * {@link SidebarLayout}.
 */
export function getSidebarPaddingX(layout: SidebarLayout): number {
	return layout === "compact" ? 8 : 20;
}
