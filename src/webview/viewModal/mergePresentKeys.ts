import {
	type FilterDimensionId,
	VARIANT_FILTER_ROW_DIMENSIONS,
	type VariantBuckets,
} from "../../tailwind/filter";

/**
 * Merges keys from variant buckets into the per-dimension "present" sets
 * used to build the filter chip rows in the webview.
 *
 * @param target - Mutable map of dimension → set of keys seen across classes.
 * @param buckets - Variant keys for one class token.
 * @returns Nothing; mutates `target`.
 *
 * @example mergePresentKeys(present, getVariantBuckets(p.modifiers)) — union bucket keys into `present` per dimension.
 */
export function mergePresentKeys(
	target: Record<FilterDimensionId, Set<string>>,
	buckets: VariantBuckets,
): void {
	for (const id of VARIANT_FILTER_ROW_DIMENSIONS) {
		for (const k of buckets[id]) {
			target[id].add(k);
		}
	}
}
