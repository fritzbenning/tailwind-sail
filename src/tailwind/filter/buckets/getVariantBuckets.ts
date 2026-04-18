import { VARIANT_IDS } from "..";
import { compareBreakpointKeys } from "../breakpoints/compareBreakpointKeys";
import { classifyVariantModifier } from "../classify/classifyVariantModifier";
import type { FilterDimensionId } from "../variants";
import type { VariantBuckets } from "./getEmptyVariantBuckets";
import { getEmptyVariantBuckets } from "./getEmptyVariantBuckets";

/**
 * Groups variant prefixes (`md:`, `hover:`, …) into per-dimension unique keys, sorted.
 * Duplicates in `modifiers` are collapsed; breakpoint keys use responsive order, other dimensions use locale sort.
 *
 * @example
 * // Input: `['dark:', 'md:', 'hover:', 'md:']`
 * // Output: `{ theme: ['dark'], breakpoints: ['md'], state: ['hover'], … }` (empty arrays for unused dimensions)
 */
export function getVariantBuckets(
	modifiers: readonly string[],
): VariantBuckets {
	const buckets = getEmptyVariantBuckets();

	const seen: Record<FilterDimensionId, Set<string>> = {
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

	for (const m of modifiers) {
		const { dimension, key } = classifyVariantModifier(m);
		if (seen[dimension].has(key)) {
			continue;
		}
		seen[dimension].add(key);
		buckets[dimension].push(key);
	}

	for (const id of VARIANT_IDS) {
		if (id === "breakpoints") {
			buckets[id].sort(compareBreakpointKeys);
		} else {
			buckets[id].sort((a, b) =>
				a.localeCompare(b, undefined, { numeric: true }),
			);
		}
	}

	return buckets;
}
