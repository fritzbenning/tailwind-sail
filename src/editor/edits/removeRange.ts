import type { ParsedTailwindClass } from "../../tailwind/parse/types";

/**
 * Raw span to delete for `classes[tokenIndex]`, including adjacent spaces between neighbors.
 *
 * @param classes - Parsed tokens in document order.
 * @param tokenIndex - Index of the token to remove.
 * @returns Half-open raw span, or `undefined` when out of range.
 *
 * @example removeRange([{ name: "p-4", startInRaw: 0, endInRaw: 3 }], 0) => { startInRaw: 0, endInRaw: 3 }
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
