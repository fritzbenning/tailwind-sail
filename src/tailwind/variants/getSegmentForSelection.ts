import { CONTAINER_BASE_FILTER_VALUE } from '../filter/constants';
import { getChipKey } from '../utils/getChipKey';
import type { FilterDimensionId } from '../filter/variants';

export function getSegmentForSelection(dimension: FilterDimensionId, sel: string): string | null {
	if (sel === 'all') {
		return null;
	}
	if (dimension === 'state' && getChipKey(sel) === 'idle') {
		return null;
	}
	if (dimension === 'breakpoints' && getChipKey(sel) === 'base') {
		return null;
	}
	if (dimension === 'container' && getChipKey(sel) === CONTAINER_BASE_FILTER_VALUE) {
		return null;
	}
	// Sidebar "light" means "no dark variant" on tokens, not the `light:` prefix (like `idle` for state).
	if (dimension === 'theme' && getChipKey(sel) === 'light') {
		return null;
	}
	const raw = sel.trim();
	return raw.endsWith(':') ? raw : `${raw}:`;
}
