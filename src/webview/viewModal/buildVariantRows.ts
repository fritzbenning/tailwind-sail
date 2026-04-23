import {
	type FilterDimensionId,
	getVariantLabel,
	sortBreakpointsChipKeys,
	sortContainerChipKeys,
	sortStateChipKeys,
	sortThemeChipKeys,
	VARIANT_FILTER_ROW_DIMENSIONS,
} from "../../tailwind/filter";
import type { Variant } from "../types";

/**
 * Builds the sorted variant filter rows (grouped chips) from the sets of
 * keys that appear in the current class list, dropping trivial default-only
 * rows when appropriate.
 *
 * @param presentKeys - For each filter dimension, the set of chip keys
 *   that appear at least once in the string (after synthetic base chips
 *   may be added by the caller).
 * @returns `Variant` rows for the webview, omitting single-default rows
 *   (e.g. only `light` in theme) when the row would not add a useful filter.
 *
 * @example
 * // After filling `presentKeys` from the parsed classes, renderable rows:
 * buildVariantRows(present).map((r) => r.dimension) => ["state", "breakpoints", ...]
 */
export function buildVariantRows(
	presentKeys: Record<FilterDimensionId, Set<string>>,
): Variant[] {
	const rows: Variant[] = [];

	for (const dim of VARIANT_FILTER_ROW_DIMENSIONS) {
		const raw = Array.from(presentKeys[dim]);
		let keys: string[];
		if (dim === "state") {
			keys = sortStateChipKeys(raw);
		} else if (dim === "breakpoints") {
			keys = sortBreakpointsChipKeys(raw);
		} else if (dim === "container") {
			keys = sortContainerChipKeys(raw);
		} else if (dim === "theme") {
			keys = sortThemeChipKeys(raw);
		} else {
			keys = raw.sort((a, b) =>
				a.localeCompare(b, undefined, { numeric: true }),
			);
		}
		if (keys.length === 0) {
			continue;
		}
		if (
			(dim === "state" && keys.length === 1 && keys[0] === "idle") ||
			(dim === "breakpoints" && keys.length === 1 && keys[0] === "base") ||
			(dim === "container" && keys.length === 1 && keys[0] === "base") ||
			(dim === "theme" && keys.length === 1 && keys[0] === "light")
		) {
			continue;
		}
		rows.push({
			dimension: dim,
			label: getVariantLabel(dim),
			value: keys,
		});
	}

	return rows;
}
