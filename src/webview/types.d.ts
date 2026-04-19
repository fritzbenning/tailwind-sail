import type { FilterDimensionId, VariantBuckets } from "../tailwind/filter";

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
	readonly values: readonly string[];
}

export interface ClassItem {
	readonly tokenIndex: number;
	readonly fullClass: string;
	readonly utility: string;
	readonly variantBuckets: VariantBuckets;
}
