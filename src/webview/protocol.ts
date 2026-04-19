import type { FilterDimensionId, VariantBuckets } from "../tailwind/filter";

export type SailWebviewViewModel =
	| { kind: "needString" }
	| { kind: "noTailwind" }
	| SailWebviewPanelModel;

export interface SailWebviewPanelModel {
	readonly kind: "panel";
	readonly utilityChips: readonly { readonly id: string }[];
	readonly variantRows: readonly SailWebviewVariantRow[];
	readonly showVariantPrefixToggle: boolean;
	readonly classes: readonly SailWebviewClassItem[];
}

export interface SailWebviewVariantRow {
	readonly dimension: FilterDimensionId;
	readonly label: string;
	readonly values: readonly string[];
}

export interface SailWebviewClassItem {
	readonly tokenIndex: number;
	readonly fullClass: string;
	readonly utility: string;
	readonly variantBuckets: VariantBuckets;
}
