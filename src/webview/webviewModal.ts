import type { SailEditorSnapshot } from "../editor/types";
import {
	type FilterDimensionId,
	getVariantBuckets,
	getVariantLabel,
	hasDarkTheme,
	sortBreakpointsChipKeys,
	sortContainerChipKeys,
	sortStateChipKeys,
	sortThemeChipKeys,
	VARIANT_FILTER_ROW_DIMENSIONS,
	type VariantBuckets,
} from "../tailwind/filter";
import { UTILITY_CATEGORIES } from "../tailwind/filter/categories";
import { classifyTailwindUtility } from "../tailwind/filter/classify/classifyTailwindUtility";
import type { ParsedTailwindClass } from "../tailwind/parse/types";
import { prepareTailwindClassForFilter } from "../tailwind/variants/prepareTailwindClassForFilter";
import type { ClassItem, PanelModal, Variant, WebviewModal } from "./types";

function mergePresentKeys(
	target: Record<FilterDimensionId, Set<string>>,
	buckets: VariantBuckets,
): void {
	for (const id of VARIANT_FILTER_ROW_DIMENSIONS) {
		for (const k of buckets[id]) {
			target[id].add(k);
		}
	}
}

function buildVariantRows(
	presentKeys: Record<FilterDimensionId, Set<string>>,
): Variant[] {
	const rows: Variant[] = [];

	for (const dim of VARIANT_FILTER_ROW_DIMENSIONS) {
		const raw = Array.from(presentKeys[dim]);
		let keys: string[];
		if (dim === "state") {
			keys = sortStateChipKeys(raw);
		} else if (dim === "breakpoints") {
			keys = sortBreakpointsChipKeys(raw);
		} else if (dim === "container") {
			keys = sortContainerChipKeys(raw);
		} else if (dim === "theme") {
			keys = sortThemeChipKeys(raw);
		} else {
			keys = raw.sort((a, b) =>
				a.localeCompare(b, undefined, { numeric: true }),
			);
		}
		if (keys.length === 0) {
			continue;
		}
		if (
			(dim === "state" && keys.length === 1 && keys[0] === "idle") ||
			(dim === "breakpoints" && keys.length === 1 && keys[0] === "base") ||
			(dim === "container" && keys.length === 1 && keys[0] === "base") ||
			(dim === "theme" && keys.length === 1 && keys[0] === "light")
		) {
			continue;
		}
		rows.push({
			dimension: dim,
			label: getVariantLabel(dim),
			value: keys,
		});
	}

	return rows;
}

export function buildSailWebviewViewModel(
	snapshot: SailEditorSnapshot,
): WebviewModal {
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
