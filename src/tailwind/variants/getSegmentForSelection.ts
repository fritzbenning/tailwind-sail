import { getChipKey } from '../utils/getChipKey';
import type { FilterDimensionId } from '../filter/variants';

export function getSegmentForSelection(dimension: FilterDimensionId, sel: string): string | null {
	if (sel === 'all') {
		return null;
	}
	const key = getChipKey(sel);
	if (dimension === 'state' && key === 'idle') {
		return null;
	}
	if (dimension === 'breakpoints' && key === 'base') {
		return null;
	}
	if (dimension === 'container' && key === 'base') {
		return null;
	}
	// Sidebar "light" means "no dark variant" on tokens, not the `light:` prefix (like `idle` for state).
	if (dimension === 'theme' && key === 'light') {
		return null;
	}
	const raw = sel.trim();
	return raw.endsWith(':') ? raw : `${raw}:`;
}
