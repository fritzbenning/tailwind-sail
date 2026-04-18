import type { ParsedTailwindClass } from '../../tailwind/parse/types';

/**
 * Half-open **[startInRaw, endInRaw)** in the raw class string: clear this slice to remove
 * `classes[tokenIndex]`, including adjacent spaces so the rest stays space-separated.
 */
export function removeRange(
	classes: readonly ParsedTailwindClass[],
	tokenIndex: number,
): { startInRaw: number; endInRaw: number } | undefined {
	const c = classes[tokenIndex];
	if (!c) {
		return undefined;
	}
	if (classes.length === 1) {
		return { startInRaw: 0, endInRaw: c.endInRaw };
	}
	if (tokenIndex === 0) {
		const next = classes[1];
		return { startInRaw: 0, endInRaw: next.startInRaw };
	}
	const prev = classes[tokenIndex - 1];
	return { startInRaw: prev.endInRaw, endInRaw: c.endInRaw };
}
