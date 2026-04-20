import { getEmptyVariantBuckets } from "@ext/filter";
import type { ClassItem, PanelModal, WebviewModal } from "../types";

/**
 * Minimal {@link ClassItem} for component tests.
 */
export function makeClassItem(overrides?: Partial<ClassItem>): ClassItem {
	return {
		tokenIndex: 0,
		fullClass: "text-sm",
		utility: "text",
		variantBuckets: getEmptyVariantBuckets(),
		...overrides,
	};
}

/**
 * Minimal {@link PanelModal} for component tests.
 */
export function makePanelModal(overrides?: Partial<PanelModal>): PanelModal {
	return {
		kind: "panel",
		utilities: [{ id: "text" }],
		variants: [
			{
				dimension: "breakpoints",
				label: "Breakpoints",
				value: ["md", "lg"],
			},
		],
		showVariantPrefixToggle: false,
		classes: [],
		...overrides,
	};
}

export function asWebviewModal(panel: PanelModal): WebviewModal {
	return panel;
}
