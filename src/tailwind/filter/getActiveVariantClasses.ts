import { CONTAINER_BASE_FILTER_VALUE } from './constants';
import { VARIANT_IDS, type FilterDimensionId } from './variants';

/** Matches sidebar variant filter state: one selected chip key (or `'all'`) per dimension. */
export type VariantFilterEff = Record<FilterDimensionId, string>;

function chipKey(sel: string): string {
	const t = sel.trim();
	return (t.endsWith(':') ? t.slice(0, -1) : t).toLowerCase();
}

function segmentForSelection(dimension: FilterDimensionId, sel: string): string | null {
	if (sel === 'all') {
		return null;
	}
	if (dimension === 'state' && chipKey(sel) === 'idle') {
		return null;
	}
	if (dimension === 'breakpoints' && chipKey(sel) === 'base') {
		return null;
	}
	if (dimension === 'container' && chipKey(sel) === CONTAINER_BASE_FILTER_VALUE) {
		return null;
	}
	// Sidebar "light" means "no dark variant" on tokens, not the `light:` prefix (like `idle` for state).
	if (dimension === 'theme' && chipKey(sel) === 'light') {
		return null;
	}
	const raw = sel.trim();
	return raw.endsWith(':') ? raw : `${raw}:`;
}

/**
 * Returns the concatenated Tailwind variant prefix for the active sidebar filters (e.g. `dark:hover:`),
 * in {@link VARIANT_IDS} order. Only dimensions that currently have a filter row in the panel are included.
 */
export function getActiveVariantClasses(
	presentRowDimensions: ReadonlySet<FilterDimensionId>,
	variantEff: VariantFilterEff,
): string {
	const parts: string[] = [];
	for (const dim of VARIANT_IDS) {
		if (!presentRowDimensions.has(dim)) {
			continue;
		}
		const sel = variantEff[dim] ?? 'all';
		const seg = segmentForSelection(dim, sel);
		if (seg) {
			parts.push(seg);
		}
	}
	return parts.join('');
}
