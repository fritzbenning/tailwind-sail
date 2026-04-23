import { getSidebarPaddingTop } from "./settings/values/getSidebarPaddingTop";
import { getSidebarPaddingX } from "./settings/values/getSidebarPaddingX";
import type { SidebarLayout, WebviewSettings } from "./types";

export function getWebviewSettings(
	horizontal: SidebarLayout = "loose",
	paddingTop: SidebarLayout = "compact",
	showSidebarRightBorder = false,
	showUtilityPreview = true,
): WebviewSettings {
	return {
		sidebarPaddingXPx: getSidebarPaddingX(horizontal),
		sidebarPaddingTopPx: getSidebarPaddingTop(paddingTop),
		showSidebarRightBorder,
		showUtilityPreview,
	};
}
