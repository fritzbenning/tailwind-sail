import { VARIANT_IDS } from "..";
import { compareBreakpointKeys } from "../breakpoints/compareBreakpointKeys";
import { classifyVariantModifier } from "../classify/classifyVariantModifier";
import type { FilterDimensionId } from "../variants";
import type { VariantBuckets } from "./getEmptyVariantBuckets";
import { getEmptyVariantBuckets } from "./getEmptyVariantBuckets";

/**
 * Buckets variant prefixes into sorted unique keys per dimension (breakpoint order vs locale sort).
 *
 * @param modifiers - Variant prefixes with trailing `:` from one class.
 * @returns Per-dimension unique keys (no trailing `:`).
 *
 * @example getVariantBuckets(["dark:", "md:", "hover:", "md:"]).theme => ["dark"]
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
