import type { SidebarLayout } from "../../types";

/**
 * Maps a stored `tailwind-sail.layout` / `tailwind-sail.paddingTop` value to a
 * {@link SidebarLayout}.
 * Any value other than `"compact"` is treated as `"loose"` (including `undefined`
 * and unexpected strings) so the sidebar stays usable if the setting is corrupted.
 */
export function parseSettingsValue(raw: string | undefined): SidebarLayout {
	return raw === "compact" ? "compact" : "loose";
}
