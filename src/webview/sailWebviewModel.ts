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
import { normalizeClass } from "../tailwind/utils/normalizeClass";
import { splitTailwindClassVariants } from "../tailwind/variants/splitTailwindClassVariants";
import type {
	SailWebviewClassItem,
	SailWebviewPanelModel,
	SailWebviewVariantRow,
	SailWebviewViewModel,
} from "./protocol";

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
): SailWebviewVariantRow[] {
	const rows: SailWebviewVariantRow[] = [];

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
			values: keys,
		});
	}

	return rows;
}

export function buildSailWebviewViewModel(
	snapshot: SailEditorSnapshot,
): SailWebviewViewModel {
	const stringDetected = snapshot.extracted !== undefined;
	const classes = snapshot.parsed?.classes ?? [];
	const looksTw = snapshot.parsed?.looksLikeTailwind === true;

	if (!stringDetected) {
		return { kind: "needString" };
	}
	if (!looksTw) {
		return { kind: "noTailwind" };
	}

	const perClassModifiers = classes.map(
		(c) => splitTailwindClassVariants(c.name).modifiers,
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

	for (const mods of perClassModifiers) {
		const buckets = getVariantBuckets(mods);
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

	const variantRows = buildVariantRows(presentKeys);

	const utilityCategoriesPresent = new Set<string>();
	for (const c of classes) {
		const utility = normalizeClass(splitTailwindClassVariants(c.name).utility);
		utilityCategoriesPresent.add(classifyTailwindUtility(utility));
	}
	const utilityChips: { id: string }[] = [];
	for (const cat of UTILITY_CATEGORIES) {
		if (utilityCategoriesPresent.has(cat.id)) {
			utilityChips.push({ id: cat.id });
		}
	}

	const classItems: SailWebviewClassItem[] = classes.map(
		(c: ParsedTailwindClass, tokenIndex: number) => {
			const mods = perClassModifiers[tokenIndex] ?? [];
			const utility = normalizeClass(
				splitTailwindClassVariants(c.name).utility,
			);
			const utilityCategory = classifyTailwindUtility(utility);
			const buckets = getVariantBuckets(mods);
			return {
				tokenIndex,
				fullClass: c.name,
				utility: utilityCategory,
				variantBuckets: buckets,
			};
		},
	);

	const panel: SailWebviewPanelModel = {
		kind: "panel",
		utilityChips,
		variantRows,
		showVariantPrefixToggle: variantRows.length > 0,
		classes: classItems,
	};

	return panel;
}
