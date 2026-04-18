import type { SailEditorSnapshot } from '../editor/types';
import type { ParsedTailwindClass } from '../tailwind/parse/types';
import { UTILITY_CATEGORIES } from '../tailwind/filter/categories';
import { classifyTailwindUtility } from '../tailwind/filter/classify/classifyTailwindUtility';
import {
	CONTAINER_BASE_FILTER_VALUE,
	VARIANT_FILTER_ROW_DIMENSIONS,
	getVariantBuckets,
	getVariantLabel,
	sortBreakpointsChipKeys,
	sortContainerChipKeys,
	sortStateChipKeys,
	sortThemeChipKeys,
	hasDarkTheme,
	type VariantBuckets,
	type FilterDimensionId,
} from '../tailwind/filter';
import { normalizeClass } from '../tailwind/utils/normalizeClass';
import { splitTailwindClassVariants } from '../tailwind/variants/splitTailwindClassVariants';
import { rawSpanToDocOffsets } from '../string/utils/rawSpanToDocOffsets';
import type { SailWebviewClassItem, SailWebviewPanelModel, SailWebviewVariantRow, SailWebviewViewModel } from './protocol';

function mergePresentKeys(target: Record<FilterDimensionId, Set<string>>, buckets: VariantBuckets): void {
	for (const id of VARIANT_FILTER_ROW_DIMENSIONS) {
		for (const k of buckets[id]) {
			target[id].add(k);
		}
	}
}

function buildVariantRows(presentKeys: Record<FilterDimensionId, Set<string>>): SailWebviewVariantRow[] {
	const rows: SailWebviewVariantRow[] = [];

	for (const dim of VARIANT_FILTER_ROW_DIMENSIONS) {
		const raw = Array.from(presentKeys[dim]);
		let keys: string[];
		if (dim === 'state') {
			keys = sortStateChipKeys(raw);
		} else if (dim === 'breakpoints') {
			keys = sortBreakpointsChipKeys(raw);
		} else if (dim === 'container') {
			keys = sortContainerChipKeys(raw);
		} else if (dim === 'theme') {
			keys = sortThemeChipKeys(raw);
		} else {
			keys = raw.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
		}
		if (keys.length === 0) {
			continue;
		}
		if (
			(dim === 'state' && keys.length === 1 && keys[0] === 'idle') ||
			(dim === 'breakpoints' && keys.length === 1 && keys[0] === 'base') ||
			(dim === 'container' && keys.length === 1 && keys[0] === CONTAINER_BASE_FILTER_VALUE) ||
			(dim === 'theme' && keys.length === 1 && keys[0] === 'light')
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

export function buildSailWebviewViewModel(snapshot: SailEditorSnapshot): SailWebviewViewModel {
	const stringDetected = snapshot.extracted !== undefined;
	const classes = snapshot.parsed?.classes ?? [];
	const looksTw = snapshot.parsed?.looksLikeTailwind === true;

	if (!stringDetected) {
		return { kind: 'needString' };
	}
	if (!looksTw) {
		return { kind: 'noTailwind' };
	}

	const perClassModifiers = classes.map((c) => splitTailwindClassVariants(c.name).modifiers);

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
			presentKeys.state.add('idle');
		}
		offerThemeLightChip ||= !hasDarkTheme(buckets);
		offerBreakpointsBaseChip ||= buckets.breakpoints.length === 0;
		offerContainerBaseChip ||= buckets.container.length === 0;
	}
	if (offerThemeLightChip) {
		presentKeys.theme.add('light');
	}
	if (offerBreakpointsBaseChip) {
		presentKeys.breakpoints.add('base');
	}
	if (offerContainerBaseChip) {
		presentKeys.container.add(CONTAINER_BASE_FILTER_VALUE);
	}

	const variantRows = buildVariantRows(presentKeys);

	const semanticPresent = new Set<string>();
	for (const c of classes) {
		const utility = normalizeClass(splitTailwindClassVariants(c.name).utility);
		semanticPresent.add(classifyTailwindUtility(utility));
	}
	const semanticChips: { id: string }[] = [];
	for (const cat of UTILITY_CATEGORIES) {
		if (semanticPresent.has(cat.id)) {
			semanticChips.push({ id: cat.id });
		}
	}

	const classItems: SailWebviewClassItem[] = classes.map((c: ParsedTailwindClass, tokenIndex: number) => {
		const mods = perClassModifiers[tokenIndex] ?? [];
		const utility = normalizeClass(splitTailwindClassVariants(c.name).utility);
		const semantic = classifyTailwindUtility(utility);
		const buckets = getVariantBuckets(mods);
		const canMap =
			snapshot.extracted &&
			rawSpanToDocOffsets(snapshot.extracted.rawToDocSegments, c.startInRaw, c.endInRaw) !== undefined;
		const editable = Boolean(stringDetected && looksTw && canMap);
		return {
			tokenIndex,
			fullClass: c.name,
			semantic,
			variantBuckets: buckets,
			editable,
		};
	});

	const panel: SailWebviewPanelModel = {
		kind: 'panel',
		semanticChips,
		variantRows,
		showVariantPrefixToggle: variantRows.length > 0,
		classes: classItems,
	};

	return panel;
}
