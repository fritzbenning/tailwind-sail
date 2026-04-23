import type { SailEditorSnapshot } from "../../editor/types";
import {
	type FilterDimensionId,
	getVariantBuckets,
	hasDarkTheme,
} from "../../tailwind/filter";
import { UTILITY_CATEGORIES } from "../../tailwind/filter/categories";
import { classifyTailwindUtility } from "../../tailwind/filter/classify/classifyTailwindUtility";
import type { ParsedTailwindClass } from "../../tailwind/parse/types";
import { prepareTailwindClassForFilter } from "../../tailwind/variants/prepareTailwindClassForFilter";
import type { ClassItem, PanelModal, WebviewModal } from "../types";
import { buildVariantRows } from "./buildVariantRows";
import { mergePresentKeys } from "./mergePresentKeys";

/**
 * Derives the sidebar webview payload from the current editor string snapshot:
 * "no string", "not Tailwind", or a `panel` with utilities, variant chips,
 * and per-class metadata for the UI.
 *
 * @param snapshot - Last extracted/parsed `class` string and Tailwind heuristics
 *   from the editor.
 * @returns A discriminated `WebviewModal` for the webview: `noString` when
 *   nothing to parse, `noTailwind` when the string does not look like Tailwind,
 *   or `panel` with filter rows and class items.
 *
 * @example
 * buildSailWebviewViewModel(snapshot).kind === "noString" — when the cursor
 * is not in a `class` string.
 *
 * @example
 * buildSailWebviewViewModel(snapshot).kind === "panel" — when classes were
 * parsed and look like Tailwind; then `.utilities` and `.variants` drive the UI.
 */
export function buildViewModal(snapshot: SailEditorSnapshot): WebviewModal {
	const stringDetected = snapshot.extracted !== undefined;
	const classes = snapshot.parsed?.classes ?? [];
	const looksTw = snapshot.parsed?.looksLikeTailwind === true;

	if (!stringDetected) {
		return { kind: "noString" };
	}
	if (!looksTw) {
		return { kind: "noTailwind" };
	}

	const prepared = classes.map((c) => prepareTailwindClassForFilter(c.name));
	const variantBucketsPerClass = prepared.map((p) =>
		getVariantBuckets(p.modifiers),
	);

	const presentKeys: Record<FilterDimensionId, Set<string>> = {
		aria: new Set(),
		breakpoints: new Set(),
		container: new Set(),
		data: new Set(),
		dir: new Set(),
		form: new Set(),
		logical: new Set(),
		media: new Set(),
		misc: new Set(),
		other: new Set(),
		popover: new Set(),
		pseudo: new Set(),
		state: new Set(),
		structural: new Set(),
		supports: new Set(),
		theme: new Set(),
	};

	let offerThemeLightChip = false;
	let offerBreakpointsBaseChip = false;
	let offerContainerBaseChip = false;

	for (const buckets of variantBucketsPerClass) {
		mergePresentKeys(presentKeys, buckets);
		if (buckets.state.length === 0) {
			presentKeys.state.add("idle");
		}
		offerThemeLightChip ||= !hasDarkTheme(buckets);
		offerBreakpointsBaseChip ||= buckets.breakpoints.length === 0;
		offerContainerBaseChip ||= buckets.container.length === 0;
	}
	if (offerThemeLightChip) {
		presentKeys.theme.add("light");
	}
	if (offerBreakpointsBaseChip) {
		presentKeys.breakpoints.add("base");
	}
	if (offerContainerBaseChip) {
		presentKeys.container.add("base");
	}

	const variants = buildVariantRows(presentKeys);

	const utilityCategoriesPresent = new Set<string>();
	for (const p of prepared) {
		utilityCategoriesPresent.add(classifyTailwindUtility(p.utilityNormalized));
	}
	const utilities: { id: string }[] = [];
	for (const cat of UTILITY_CATEGORIES) {
		if (utilityCategoriesPresent.has(cat.id)) {
			utilities.push({ id: cat.id });
		}
	}

	const classItems: ClassItem[] = classes.map(
		(c: ParsedTailwindClass, tokenIndex: number) => {
			const p = prepared[tokenIndex]!;
			const utilityCategory = classifyTailwindUtility(p.utilityNormalized);
			const buckets = variantBucketsPerClass[tokenIndex]!;
			return {
				tokenIndex,
				fullClass: c.name,
				utility: utilityCategory,
				variantBuckets: buckets,
			};
		},
	);

	const panel: PanelModal = {
		kind: "panel",
		utilities,
		variants,
		showVariantPrefixToggle: variants.length > 0,
		classes: classItems,
	};

	return panel;
}
