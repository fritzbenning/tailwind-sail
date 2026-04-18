import { VARIANT_IDS, classifyVariantModifier, type FilterDimensionId } from '@ext/filter';
import { splitTailwindClassVariants } from '@ext/variants/splitTailwindClassVariants';
import type { SailWebviewClassItem, SailWebviewPanelModel } from '@sail/protocol';

export type SemanticFilter = { t: 'all' } | { t: 'semantic'; v: string };

export type VariantFilterState = Record<FilterDimensionId, string>;

export function emptyVariantFilterState(): VariantFilterState {
	const o = {} as VariantFilterState;
	for (const id of VARIANT_IDS) {
		o[id] = 'all';
	}
	return o;
}

export interface ClientFilterState {
	semantic: SemanticFilter;
	variant: VariantFilterState;
	classSearch: string;
	hideMatchingVariantPrefixes: boolean;
}

export function defaultClientFilterState(): ClientFilterState {
	return {
		semantic: { t: 'all' },
		variant: emptyVariantFilterState(),
		classSearch: '',
		hideMatchingVariantPrefixes: false,
	};
}

function shouldStripVariantModifier(sel: string, dimension: FilterDimensionId, key: string): boolean {
	if (sel === 'all') {
		return false;
	}
	if (dimension === 'state' && sel === 'idle') {
		return false;
	}
	if (dimension === 'breakpoints' && sel === 'base') {
		return false;
	}
	if (dimension === 'container' && sel === 'base') {
		return false;
	}
	return sel === key;
}

export function stripMatchingVariantPrefixesForDisplay(fullClass: string, variantEff: VariantFilterState): string {
	const trimmed = fullClass.trim();
	if (!trimmed) {
		return fullClass;
	}
	const { modifiers, utility } = splitTailwindClassVariants(trimmed);
	const kept: string[] = [];
	for (const mod of modifiers) {
		const { dimension, key } = classifyVariantModifier(mod);
		const sel = variantEff[dimension] ?? 'all';
		if (shouldStripVariantModifier(sel, dimension, key)) {
			continue;
		}
		kept.push(mod);
	}
	return kept.join('') + utility;
}

export function presentVariantDimensions(panel: SailWebviewPanelModel): Set<FilterDimensionId> {
	return new Set(panel.variantRows.map((r) => r.dimension));
}

export function effectiveSemanticFilter(panel: SailWebviewPanelModel, st: SemanticFilter): SemanticFilter {
	if (panel.semanticChips.length === 0) {
		return { t: 'all' };
	}
	return st;
}

export function effectiveVariantState(panel: SailWebviewPanelModel, variantSt: VariantFilterState): VariantFilterState {
	const rows = presentVariantDimensions(panel);
	const out = emptyVariantFilterState();
	for (const id of VARIANT_IDS) {
		out[id] = rows.has(id) ? (variantSt[id] ?? 'all') : 'all';
	}
	return out;
}

export function rowMatchesSemanticFilter(item: SailWebviewClassItem, st: SemanticFilter): boolean {
	if (st.t === 'all') {
		return true;
	}
	if (st.t === 'semantic') {
		return item.semantic === st.v;
	}
	return true;
}

export function rowMatchesClassSearch(item: SailWebviewClassItem, queryTrimmedLower: string): boolean {
	if (queryTrimmedLower.length === 0) {
		return true;
	}
	return item.fullClass.toLowerCase().includes(queryTrimmedLower);
}

export function rowMatchesVariantFilters(
	item: SailWebviewClassItem,
	variantEff: VariantFilterState,
	panel: SailWebviewPanelModel,
): boolean {
	const rows = presentVariantDimensions(panel);
	const buckets = item.variantBuckets;
	for (const dim of VARIANT_IDS) {
		if (!rows.has(dim)) {
			continue;
		}
		const sel = variantEff[dim] ?? 'all';
		if (sel === 'all') {
			continue;
		}
		const arr = buckets[dim] ?? [];
		if (dim === 'state' && sel === 'idle') {
			if (arr.length !== 0) {
				return false;
			}
			continue;
		}
		if (dim === 'theme' && sel === 'light') {
			if (arr.includes('dark')) {
				return false;
			}
			continue;
		}
		if (dim === 'breakpoints' && sel === 'base') {
			if (arr.length !== 0) {
				return false;
			}
			continue;
		}
		if (dim === 'container' && sel === 'base') {
			if (arr.length !== 0) {
				return false;
			}
			continue;
		}
		if (!arr.includes(sel)) {
			return false;
		}
	}
	return true;
}

export function filterStateIsAvailable(panel: SailWebviewPanelModel, st: ClientFilterState): boolean {
	const semantic = st.semantic;
	if (semantic.t === 'all') {
		/* ok */
	} else if (semantic.t === 'semantic') {
		const ok = panel.semanticChips.some((c) => c.id === semantic.v);
		if (!ok) {
			return false;
		}
	} else {
		return false;
	}

	for (const row of panel.variantRows) {
		const sel = st.variant[row.dimension] ?? 'all';
		if (sel === 'all') {
			continue;
		}
		if (!row.values.includes(sel)) {
			return false;
		}
	}
	return true;
}

export function classItemVisible(
	item: SailWebviewClassItem,
	panel: SailWebviewPanelModel,
	st: ClientFilterState,
): boolean {
	const semEff = effectiveSemanticFilter(panel, st.semantic);
	const varEff = effectiveVariantState(panel, st.variant);
	const q = st.classSearch.trim().toLowerCase();
	return (
		rowMatchesSemanticFilter(item, semEff) &&
		rowMatchesVariantFilters(item, varEff, panel) &&
		rowMatchesClassSearch(item, q)
	);
}

export function anyClassVisible(panel: SailWebviewPanelModel, st: ClientFilterState): boolean {
	if (panel.classes.length === 0) {
		return false;
	}
	return panel.classes.some((c) => classItemVisible(c, panel, st));
}
