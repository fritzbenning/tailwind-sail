import type { FilterDimensionId, VariantBuckets } from "../tailwind/filter";

export type SidebarLayout = "compact" | "loose";

export type WebviewSettings = {
	sidebarPaddingXPx: number;
	sidebarPaddingTopPx: number;
	showSidebarRightBorder: boolean;
	showUtilityPreview: boolean;
};

export type WebviewModal =
	| { kind: "noString" }
	| { kind: "noTailwind" }
	| PanelModal;

export interface PanelModal {
	readonly kind: "panel";
	readonly utilities: readonly { readonly id: string }[];
	readonly variants: readonly Variant[];
	readonly showVariantPrefixToggle: boolean;
	readonly classes: readonly ClassItem[];
}

export interface Variant {
	readonly dimension: FilterDimensionId;
	readonly label: string;
	readonly value: readonly string[];
}

export interface ClassItem {
	readonly tokenIndex: number;
	readonly fullClass: string;
	readonly utility: string;
	readonly variantBuckets: VariantBuckets;
}

export type {
	CssVariableEntry,
	SimpleDefinitionScope,
	VariableDefinitionLocation,
} from "../theme/types";

/** Accompanies `tailwind-sail-variables` so the theme tab can explain an empty list. */
export type ThemeFileScanInfo = {
	readonly configuredPathCount: number;
	readonly resolvedCssPathCount: number;
	/** `true` when at least one workspace folder is open. */
	readonly hasWorkspace: boolean;
};
